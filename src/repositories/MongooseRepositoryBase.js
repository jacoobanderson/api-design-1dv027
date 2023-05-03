import mongoose from 'mongoose'
import { RepositoryError } from '../lib/errors/RepositoryError.js'

/**
 * Encapsulates a Mongoose repository base.
 */
export class MongooseRepositoryBase {
  /**
   * The Mongoose model.
   *
   * @type {mongoose.Model}
   */
  #model

  /**
   * Initializes a new instance.
   *
   * @param {mongoose.Model} model - A Mongoose model.
   */
  constructor (model) {
    this.#model = model
  }

  /**
   * Gets documents.
   *
   * @param {object} filter - Filter to apply to the query.
   * @param {object|string|string[]} [projection] - Fields to return.
   * @param {object} [options] - See Query.prototype.setOptions().
   * @example
   * // Passing options
   * await myModelRepository.get({ name: /john/i }, null, { skip: 10 }).exec()
   * @returns {Promise<object[]>} Promise resolved with the found documents.
   */
  async get (filter, projection = null, options = null) {
    try {
      return await this.#model
        .find(filter, projection, options)
        .exec()
    } catch (error) {
      throw new RepositoryError('Failed to get documents.', { cause: error })
    }
  }

  /**
   * Gets a single document by its id.
   *
   * @param {object|number|string} id - Value of the document id to get.
   * @param {object|string|string[]} [projection] - Fields to return.
   * @param {object} [options] - See Query.prototype.setOptions().
   * @returns {Promise<object>} Promise resolved with the found document.
   */
  async getById (id, projection, options) {
    try {
      const doc = await this.#model
        .findById(id, projection, options)
        .exec()

      if (!doc) {
        throw new mongoose.Error.DocumentNotFoundError()
      }

      return doc
    } catch (error) {
      throw new RepositoryError('Failed to get document.', { cause: error })
    }
  }

  /**
   * Gets a single document by the conditions.
   *
   * @param {object} conditions - Value of the document conditions to get.
   * @param {object|string|string[]} [projection] - Fields to return.
   * @param {object} [options] - See Query.prototype.setOptions().
   * @returns {Promise<object>} Promise resolved with the found document.
   */
  async getOne (conditions, projection, options) {
    try {
      const doc = await this.#model
        .findOne(conditions, projection, options)
        .exec()

      if (!doc) {
        throw new mongoose.Error.DocumentNotFoundError()
      }

      return doc
    } catch (error) {
      throw new RepositoryError('Failed to get document.', { cause: error })
    }
  }

  /**
   * Inserts a document into the database.
   *
   * @param {object} insertData -  The data to create a new document out of.
   * @returns {Promise<object>} Promise resolved with the new document.
   */
  async insert (insertData) {
    try {
      return await this.#model.create(insertData)
    } catch (error) {
      throw new RepositoryError('Failed to insert document.', { cause: error })
    }
  }

  /**
   * Deletes a document.
   *
   * @param {mongoose.Document} doc - The documents to delete.
   * @param {object} deleteData - The version of the document to delete.
   * @returns {Promise<object>} Promise resolved with the removed document.
   */
  async delete (doc, deleteData) {
    try {
      this.#ensureVersion(doc, deleteData)

      return await doc.deleteOne()
    } catch (error) {
      throw new RepositoryError('Failed to delete document.', { cause: error })
    }
  }

  /**
   * Replaces a document according to the new data. Missing properties with default values
   * will be added. Properties with undefined values will be removed.
   *
   * @param {mongoose.Document} doc - The documents to replace.
   * @param {object} replaceData - The new data to replace the existing document with.
   * @throws {Error} If the specified data contains invalid property names.
   * @returns {Promise<object>} Promise resolved with the updated document.
   */
  async replace (doc, replaceData) {
    try {
      return await this.#update(doc, replaceData, true)
    } catch (error) {
      throw new RepositoryError('Failed to replace document.', { cause: error })
    }
  }

  /**
   * Updates a document according to the new data.
   *
   * @param {mongoose.Document} doc - The documents to update.
   * @param {object} updateData - The new data to update the existing document with.
   * @throws {Error} If the specified data contains invalid property names.
   * @returns {Promise<object>} Promise resolved with the updated document.
   */
  async update (doc, updateData) {
    try {
      return await this.#update(doc, updateData)
    } catch (error) {
      throw new RepositoryError('Failed to update document.', { cause: error })
    }
  }

  /**
   * Adds default values for properties that are not specified in the update data.
   *
   * @param {object} data - The data to add default values to.
   */
  #ensureDefaultValues (data) {
    const dataKeys = Object.keys(data)

    Object.entries(this.#model.schema.paths)
      .filter(([path, item]) => !['_id', 'createdAt', 'updatedAt', '__v'].includes(path) &&
        (!dataKeys.includes(path) || data[path] === undefined)
      )
      .forEach(([path, item]) => {
        data[path] = Object.hasOwn(item, 'defaultValue')
          ? (typeof item.defaultValue === 'function' ? item.defaultValue() : item.defaultValue)
          : undefined // NOTE: The key will be removed from the document.
      })
  }

  /**
   * Ensures that the version of the document is the same as the version
   * of the document in the database.
   *
   * @param {mongoose.Document} doc - The documents to update.
   * @param {object} data - The new data that perhaps contain version.
   */
  #ensureVersion (doc, data) {
    if ('__v' in data) {
      if (data.__v !== doc.__v) {
        throw new mongoose.Error.VersionError(doc, data.__v,
          Object.keys(data).filter((key) => key !== '__v'))
      }

      // No need of the version property anymore.
      delete data.__v
    }
  }

  /**
   * Updates, or replaces, a document according to the new data.
   *
   * @param {mongoose.Document} doc - The documents to update or replace.
   * @param {object} updateData - The new data to update the existing document with.
   * @param {boolean} [replace=false] - If true, the document will be replaced.
   * @throws {Error} If the specified data contains invalid property names.
   * @returns {Promise<object>} Promise resolved with the updated document.
   */
  async #update (doc, updateData, replace = false) {
    if (replace) {
      // If it's a replace operation add default values for properties that are not
      // specified in the update data. Properties with undefined values will be removed.
      // (Mimics the behavior creating a new document.)
      this.#ensureDefaultValues(updateData)
      // doc.overwrite(updateData) // TODO: Use this instead of Object.assign()? Seems to be a problem(?) with "updating" createdAt though.
    }

    this.#ensureVersion(doc, updateData)

    // Copy all own properties from update data to the document.
    Object.assign(doc, updateData)

    return doc.save()
  }
}

import mongoose from 'mongoose'
import { MongooseRepositoryBase } from '../repositories/MongooseRepositoryBase.js'

/**
 * Encapsulates a Mongoose service base.
 */
export class MongooseServiceBase {
  /**
   * The repository.
   *
   * @type {MongooseRepositoryBase}
   */
  #repository

  /**
   * Initializes a new instance.
   *
   * @param {MongooseRepositoryBase} repository - A repository instantiated from a class inherited from MongooseRepositoryBase.
   */
  constructor (repository) {
    this.#repository = repository
  }

  /**
   * Gets all documents.
   *
   * @returns {Promise<object>} Promise resolved with all documents.
   */
  async get () {
    return this.#repository.get()
  }

  /**
   * Gets a document by ID.
   *
   * @param {string} id - The value of the id for the document to get.
   * @returns {Promise<object>} Promise resolved with the found document.
   */
  async getById (id) {
    return this.#repository.getById(id)
  }

  /**
   * Inserts a new document.
   *
   * @param {object} data - The data to insert.
   * @returns {Promise<object>} Promise resolved with the created document.
   */
  async insert (data) {
    return this.#repository.insert(data)
  }

  /**
   * Updates a document.
   *
   * @param {mongoose.Document} doc - The documents to update.
   * @param {object} updateData - The new data to update the existing document with.
   * @returns {Promise<object>} Promise resolved with the updated document.
   */
  async update (doc, updateData) {
    return this.#repository.update(doc, updateData)
  }

  /**
   * Replaces a document.
   *
   * @param {mongoose.Document} doc - The documents to replace.
   * @param {object} replaceData - The new data to replace the existing document with.
   * @returns {Promise<object>} Promise resolved with the updated document.
   */
  async replace (doc, replaceData) {
    return this.#repository.replace(doc, replaceData)
  }

  /**
   * Deletes a document.
   *
   * @param {mongoose.Document} doc - The documents to replace.
   * @param {object} deleteData - The delete data of the document to delete.
   * @returns {Promise<object>} Promise resolved with the removed document.
   */
  async delete (doc, deleteData) {
    return this.#repository.delete(doc, deleteData)
  }
}

import { Catch } from '../models/Catch.js'
import { Webhook } from '../models/Webhook.js'
import createError from 'http-errors'
import fetch from 'node-fetch'
import { linksAddCatch, linksAllCatches, linksDeleteCatch, linksSingleCatch, linksUpdateCatch } from '../utils/utils.js'

/**
 * Encapsulates a controller.
 */
export class CatchController {
  /**
   * Gets all the catches.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getAllCatches (req, res, next) {
    try {
      const catches = await Catch.find({})
      res.status(200).json({ data: catches, links: linksAllCatches() })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a catch.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async createCatch (req, res, next) {
    try {
      const catchData = {
        username: req.user.username,
        position: req.body.position,
        lake: req.body.lake,
        city: req.body.city,
        species: req.body.species,
        weight: req.body.weight,
        length: req.body.length,
        imageUrl: req.body.imageUrl
      }
      const newCatch = new Catch(catchData)
      await newCatch.save()

      this.#notifyWebhookUrls(newCatch)

      res.status(201).json({ data: catchData, links: linksAddCatch() })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Notifies the subscribers of the webhook.
   *
   * @param {object} newCatch The catch that should be notified.
   */
  async #notifyWebhookUrls (newCatch) {
    const hooks = await Webhook.find({})

    for (const subscriber of hooks) {
      fetch(subscriber.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCatch)
      })
    }
  }

  /**
   * Gets a single catch.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getSingleCatch (req, res, next) {
    try {
      const singleCatch = await Catch.findById(req.params.id)
      res.status(200).json({ data: singleCatch, links: linksSingleCatch() })
    } catch (error) {
      next(createError(404, 'The catch with that id could not be found.'))
    }
  }

  /**
   * Updates a single catch.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async updateCatch (req, res, next) {
    try {
      const id = req.params.id
      const catchToUpdate = await Catch.findById(id)

      const newCatchData = {
        username: req.user.username,
        position: req.body.position,
        lake: req.body.lake,
        city: req.body.city,
        species: req.body.species,
        weight: req.body.weight,
        length: req.body.length,
        imageUrl: req.body.imageUrl
      }

      for (const [key, value] of Object.entries(newCatchData)) {
        if (value !== undefined) {
          catchToUpdate[key] = value
        }
      }

      await catchToUpdate.save()
      res.status(200).json({ data: catchToUpdate, links: linksUpdateCatch() })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes a single catch.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async deleteCatch (req, res, next) {
    try {
      const id = req.params.id
      await Catch.findByIdAndDelete(id)
      res.status(200).json({ message: 'The catch has successfully been deleted.', links: linksDeleteCatch() })
    } catch (error) {
      next(error)
    }
  }
}

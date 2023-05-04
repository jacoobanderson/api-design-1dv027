import createError from 'http-errors'
import { Catch } from '../models/Catch.js'

/**
 * Encapsulates a controller.
 */
export class CatchController {
  /**
   * Gets all the catches.
   *
   * @param req
   * @param res
   * @param next
   */
  async getAllCatches (req, res, next) {
    try {
      const catches = await Catch.find({})
      res.status(200).json(catches)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a catch.
   *
   * @param req
   * @param res
   * @param next
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

      res.status(201).json(catchData)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Gets a single catch.
   *
   * @param req
   * @param res
   * @param next
   */
  async getSingleCatch (req, res, next) {
    try {
      const singleCatch = await Catch.findById(req.params.id)
      res.status(200).json(singleCatch)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Updates a single catch.
   *
   * @param req
   * @param res
   * @param next
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
      res.status(200).json(catchToUpdate)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes a single catch.
   *
   * @param req
   * @param res
   * @param next
   */
  async deleteCatch (req, res, next) {
    try {
      const id = req.params.id
      await Catch.findByIdAndDelete(id)
      res.status(200).json({ message: 'The catch has successfully been deleted.' })
    } catch (error) {
      next(error)
    }
  }
}

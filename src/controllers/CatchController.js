import createError from 'http-errors'
import { Catch } from '../models/Catch.js'

/**
 * Encapsulates a controller.
 */
export class CatchController {
  /**
   *
   * @param req
   * @param res
   * @param next
   */
  async getAllCatches (req, res, next) {
    try {
        console.log('test')
      const catches = await Catch.find({})
      res.status(200).json(catches)
    } catch (error) {
      next(error)
    }
  }

  /**
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
}

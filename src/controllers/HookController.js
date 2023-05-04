import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { Webhook } from '../models/Webhook.js'

/**
 * Encapsulates a controller.
 */
export class HookController {
  /**
   *
   * @param req
   * @param res
   * @param next
   */
  async addHook (req, res, next) {
    try {
      const hook = new Webhook({
        username: req.user.username,
        url: req.body.url
      })

      await hook.save()
      res.status(201).json({
        message: 'Your webhook as been created'
      })
    } catch (error) {
      next(error)
    }
  }
}

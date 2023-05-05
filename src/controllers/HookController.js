import { Webhook } from '../models/Webhook.js'

/**
 * Encapsulates a controller.
 */
export class HookController {
  /**
   * Adds a new subscriber to the webhook.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
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

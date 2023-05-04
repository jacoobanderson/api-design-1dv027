import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { HookController } from '../../../controllers/HookController.js'

export const router = express.Router()

const controller = new HookController()

/**
 * Authenticates the jwt.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticateJWT = (req, res, next) => {
  const auth = req.headers.authorization?.split(' ')

  if (auth?.[0] !== 'Bearer') {
    next(createError(401))
    return
  }

  try {
    const payload = jwt.verify(auth[1], process.env.PUBLIC_KEY)
    req.user = {
      username: payload.sub,
      id: payload.id
    }
    next()
  } catch (error) {
    const err = createError(401)
    err.cause = error
    next(err)
  }
}

router.post('/', authenticateJWT, (req, res, next) => controller.addHook(req, res, next))

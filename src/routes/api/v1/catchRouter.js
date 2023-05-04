import express from 'express'
import { CatchController } from '../../../controllers/CatchController.js'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'

export const router = express.Router()

const controller = new CatchController()

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
    console.log(error)
    const err = createError(401)
    err.cause = error
    next(err)
  }
}

router.get('/', authenticateJWT, (req, res, next) => controller.getAllCatches(req, res, next))

router.post('/', authenticateJWT, (req, res, next) => controller.createCatch(req, res, next))

router.get('/:id', authenticateJWT, (req, res, next) => controller.getSingleCatch(req, res, next))

router.put('/:id', authenticateJWT, (req, res, next) => controller.updateCatch(req, res, next))

router.delete('/:id', authenticateJWT, (req, res, next) => controller.deleteCatch(req, res, next))

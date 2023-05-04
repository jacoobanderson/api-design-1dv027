import express from 'express'
import { UserController } from '../../../controllers/UserController.js'

export const router = express.Router()

const controller = new UserController()

router.post('/sessions', (req, res, next) => controller.login(req, res, next))

router.post('/', (req, res, next) => controller.register(req, res, next))

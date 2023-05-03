import express from 'express'
import { UserController } from '../../../controllers/UserController.js'

export const router = express.Router()

const controller = new UserController()

router.post('/login', (req, res, next) => controller.login(req, res, next))

router.post('/register', (req, res, next) => controller.register(req, res, next))

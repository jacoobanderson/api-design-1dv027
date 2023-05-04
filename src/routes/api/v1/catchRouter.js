import express from 'express'
import { CatchController } from '../../../controllers/CatchController.js'

export const router = express.Router()

const controller = new CatchController()

router.get('/', (req, res, next) => controller.getAllCatches(req, res, next))

router.post('/', (req, res, next) => controller.createCatch(req, res, next))

router.get('/:id', (req, res, next) => controller.getSingleCatch(req, res, next))

router.put('/:id', (req, res, next) => controller.updateCatch(req, res, next))

router.delete('/:id', (req, res, next) => controller.deleteCatch(req, res, next))

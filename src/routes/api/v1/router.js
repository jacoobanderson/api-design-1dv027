import express from 'express'
import { router as userRouter } from './userRouter.js'
import { router as catchRouter } from './catchRouter.js'
import { router as hookRouter } from './hookRouter.js'
import { linksForEntry } from '../../../utils/utils.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this RESTful API', links: linksForEntry() }))
router.use('/users', userRouter)
router.use('/catches', catchRouter)
router.use('/webhooks', hookRouter)

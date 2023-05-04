import express from 'express'
import { router as userRouter } from './userRouter.js'
import { router as catchRouter } from './catchRouter.js'
export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))
router.use('/users', userRouter)
router.use('/catches', catchRouter)

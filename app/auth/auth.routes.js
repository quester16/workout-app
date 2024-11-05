import express from 'express'
import asyncHandler from 'express-async-handler'
import { authUser, registerUser } from './auth.controller.js'

const router = express.Router()

router.post('/login', asyncHandler(authUser))
router.post('/register', asyncHandler(registerUser))

export default router

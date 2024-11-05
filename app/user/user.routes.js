import express from 'express'
import asyncHandler from 'express-async-handler'
import authProtect from '../middlewares/auth.middleware.js'
import { getUserProfile } from './user.controller.js'

const router = express.Router()

router.get('/profile', authProtect, asyncHandler(getUserProfile))

export default router

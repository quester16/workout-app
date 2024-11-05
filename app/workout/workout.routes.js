import express from 'express'
import asyncHandler from 'express-async-handler'
import authProtect from '../middlewares/auth.middleware.js'
import {
	createWorkout,
	deleteWorkout,
	getOneWorkout,
	getWorkouts,
	updateWorkout
} from './workout.controller.js'

const router = express.Router()

router.post('/create', authProtect, asyncHandler(createWorkout))
router.get('/', authProtect, asyncHandler(getWorkouts))
router
	.get('/:id', authProtect, asyncHandler(getOneWorkout))
	.put('/:id', authProtect, asyncHandler(updateWorkout))
	.delete('/:id', authProtect, asyncHandler(deleteWorkout))

export default router

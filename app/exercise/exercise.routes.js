import express from 'express'
import asyncHandler from 'express-async-handler'
import authProtect from '../middlewares/auth.middleware.js'
import {
	createExercise,
	deleteExercise,
	getExercises,
	updateExercise
} from './exercise.controller.js'
import { createExerciseSet } from './exerciseSet/exerciseSet.controller.js'

const router = express.Router()

router.post('/', authProtect, asyncHandler(createExercise))
router.get('/', authProtect, asyncHandler(getExercises))
router.put('/:id', authProtect, asyncHandler(updateExercise))
router.delete('/:id', authProtect, asyncHandler(deleteExercise))

// exercise set
router.post('/set/:id', authProtect, asyncHandler(createExerciseSet))

export default router

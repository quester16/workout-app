import express from 'express'
import * as exerciseController from '../controller/exercise.controller.js'
import * as setcontroller from '../controller/set.controller.js'
import * as workoutController from '../controller/workout.controller.js'
import authProtect from '../../middlewares/auth.middleware.js'

const router = express.Router()

const {
	createWorkoutLog,
	completeWorkoutLog,
	getWorkouts,
	getWorkoutDetails,
	createWorkout
} = workoutController
const {
	createExerciseLog,
	completeExerciseLog,
	createExercise,
	getExercise,
	getCompletedExericises
} = exerciseController
const { createExerciseSet } = setcontroller

// Workout routes
router.get('/workouts', getWorkouts)
router.post('/workout', createWorkout)

router.get('/workout/:id', getWorkoutDetails)
router.post('/workout/log', authProtect, createWorkoutLog)
router.patch('/workout/log/:id/complete', completeWorkoutLog)

// Exercise routes
router.get('/exercise', getExercise)
router.post('/exercise/log', createExerciseLog)
router.patch('/exercise/log/:id/complete', completeExerciseLog)
router.post('/exercise', createExercise)
router.get('/exercises/completed/:id', getCompletedExericises)

// Exercise sets routes
router.post('/exercise/set/:logId', createExerciseSet)

export default router

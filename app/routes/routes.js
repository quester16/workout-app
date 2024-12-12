import express from 'express'
import * as exerciseController from '../controllers/exercise.controller.js'
import * as setcontroller from '../controllers/set.controller.js'
import * as workoutController from '../controllers/workout.controller.js'
import authProtect from '../middlewares/auth.middleware.js'

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
	getCompletedExercises
} = exerciseController
const { createExerciseSet } = setcontroller

// Workout routes
router.get('/workouts', authProtect, getWorkouts)
router.post('/workout', authProtect, createWorkout)

router.get('/workout/:id', authProtect, getWorkoutDetails)
router.post('/workout/log', authProtect, createWorkoutLog)
router.patch('/workout/log/:id/complete', authProtect, completeWorkoutLog)

// Exercise routes
router.get('/exercise', authProtect, getExercise)
router.post('/exercise/log', authProtect, createExerciseLog)
router.patch('/exercise/log/:id/complete', authProtect, completeExerciseLog)
router.post('/exercise', authProtect, createExercise)
router.get('/exercises/completed/:id', authProtect, getCompletedExercises)

// Exercise sets routes
router.post('/exercise/set/:logId', authProtect, createExerciseSet)

export default router

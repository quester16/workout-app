import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.util.js'

export const createWorkout = async (req, res) => {
	const { name, exerciseIds } = req.body
	const workout = await prisma.workout.create({
		data: {
			name,
			exercises: {
				connect: exerciseIds.map(id => ({ id: +id }))
			},
			userId: req.user.id
		}
	})

	res.json(workout)
}

//// get all workout
export const getWorkouts = async (req, res) => {
	const workouts = await prisma.workout.findMany({
		where: {
			userId: req.user.id
		},
		include: {
			exercises: true
		}
	})

	res.json(workouts)
}

//// get one workout
export const getOneWorkout = async (req, res) => {
	const workout = await prisma.workout.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			exercises: true,
			user: {
				select: UserFields
			}
		}
	})

	if (!workout) {
		res.status(404).json({
			message: 'No workout with this id'
		})
	}
	const minutes = Math.ceil(workout.exercises.length * 3.5)

	res.json({ ...workout, minutes })
}

//// update workout
export const updateWorkout = async (req, res) => {
	const { name, exerciseIds } = req.body

	const updateData = {}

	// Обновляем name, если оно пришло
	if (name !== undefined) {
		updateData.name = name
	}
	// Обновляем exercises, если пришли exerciseIds
	if (
		exerciseIds !== undefined &&
		Array.isArray(exerciseIds) &&
		exerciseIds.length > 0
	) {
		updateData.exercises = {
			set: exerciseIds.map(id => ({ id: +id }))
		}
	}

	const update = await prisma.workout.update({
		where: {
			id: +req.params.id
		},
		data: updateData
	})

	res.json(update)
}

//// delete
export const deleteWorkout = async (req, res) => {
	const id = +req.params.id

	try {
		const removeWorkout = await prisma.workout.delete({
			where: {
				id
			}
		})

		res.json(removeWorkout)
	} catch (err) {
		res.status(400).json({
			message: err.message
		})
	}
}

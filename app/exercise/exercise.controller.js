import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.util.js'

export const createExercise = async (req, res) => {
	const { name, sets, exerciseType } = req.body
	const exercise = await prisma.exercise.create({
		data: {
			name,
			sets,
			exerciseType,
			userId: req.user.id
		}
	})

	res.json(exercise)
}

// get all exercises
export const getExercises = async (req, res) => {
	try {
		const exercises = await prisma.exercise.findMany({
			where: {
				userId: req.user.id
			},
			include: {
				exerciseLog: true,
				user: {
					select: UserFields
				}
			}
		})
		res.json(exercises)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Ошибка при получении упражнений' })
	}
}

// update exercise
export const updateExercise = async (req, res) => {
	const { name, sets, exerciseType } = req.body

	const update = await prisma.exercise.update({
		where: {
			id: +req.params.id
		},
		data: {
			name,
			sets,
			exerciseType
		}
	})

	res.json(update)
}

// delete
export const deleteExercise = async (req, res) => {
	const id = +req.params.id

	try {
		const removeExercise = await prisma.exercise.delete({
			where: {
				id
			}
		})

		res.json(removeExercise)
	} catch (err) {
		res.status(400).json({
			message: err.message
		})
	}
}

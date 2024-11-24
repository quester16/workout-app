import { prisma } from '../../prisma.js'

// Получить список тренировок
export const getWorkouts = async (req, res) => {
	try {
		const workouts = await prisma.workout.findMany({
			include: {
				exercises: true
			}
		})
		res.json(workouts)
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch workouts' })
	}
}

// Получить детали тренировки по ID
export const getWorkoutDetails = async (req, res) => {
	const workoutId = +req.params.id
	try {
		const workout = await prisma.workout.findUnique({
			where: { id: workoutId },
			include: { exercises: true }
		})
		if (!workout) {
			return res.status(404).json({ message: 'Workout not found' })
		}
		res.json(workout)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// Создать лог тренировки
export const createWorkoutLog = async (req, res) => {
	const { userId, workoutId } = req.body
	try {
		const workoutLog = await prisma.workoutLog.create({
			data: {
				workoutId
			}
		})
		res.json(workoutLog)
	} catch (error) {
		res.status(500).json({ error: 'Failed to create workout log' })
	}
}

// Завершить тренировку
export const completeWorkoutLog = async (req, res) => {
	const logId = +req.params.id
	try {
		const workoutLog = await prisma.workoutLog.update({
			where: { id: logId },
			data: { isCompleted: true }
		})
		res.json(workoutLog)
	} catch (error) {
		res.status(500).json({ error: 'Failed to complete workout log' })
	}
}

export const createWorkout = async (req, res) => {
	const { name, exercises } = req.body // Получаем данные из body

	try {
		const workout = await prisma.workout.create({
			data: {
				name,
				exercises: {
					connect: exercises.map(id => ({ id })) // Привязываем упражнения через их ID
				}
			},
			include: {
				exercises: true // Чтобы в ответе получить детали привязанных упражнений
			}
		})
		res.status(201).json(workout)
	} catch (error) {
		res.status(500).json({ error: 'Failed to create workout' })
	}
}

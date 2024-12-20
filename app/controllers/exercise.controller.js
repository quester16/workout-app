import { prisma } from '../prisma.js'
import { getLastUniqueExerciseIds } from '../utils/exercise.util.js'

export const getExercise = async (req, res) => {
	try {
		const exercises = await prisma.exercise.findMany({
			include: {
				exerciseLogs: {
					select: {
						id: true,
						userId: true,
						isCompleted: true,
						times: true,
						workoutLog: true
					}
				}
			}
		})
		res.status(200).json(exercises)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}

// Создать лог упражнения
export const createExerciseLog = async (req, res) => {
	const { workoutLogId, exerciseId } = req.body

	// Получаем текущую дату без времени
	const today = new Date()
	today.setHours(0, 0, 0, 0)

	// Проверяем, существует ли workoutLog и exercise
	try {
		const workoutLog = await prisma.workoutLog.findUnique({
			where: { id: +workoutLogId }
		})

		const exercise = await prisma.exercise.findUnique({
			where: { id: +exerciseId }
		})
		if (!workoutLog || !exercise) {
			return res
				.status(400)
				.json({ error: 'Invalid workoutLogId or exerciseId' })
		}

		const exerciseLog = await prisma.exerciseLog.findFirst({
			where: {
				workoutLogId,
				exerciseId,
				createdAt: {
					gte: today,
					lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // До конца текущего дня
				},
				isCompleted: false
			}
		})
		if (exerciseLog) {
			console.log('лог уже существует')
			res.json(exerciseLog)
		} else {
			// Создаем ExerciseLog, если все проверки прошли успешно
			const exerciseLog = await prisma.exerciseLog.create({
				data: {
					workoutLogId: parseInt(workoutLogId),
					exerciseId: parseInt(exerciseId),
					userId: req.user.id
				}
			})

			res.json(exerciseLog)
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// Завершить упражнение

export const completeExerciseLog = async (req, res) => {
	const logId = parseInt(req.params.id) // Преобразуем id из строки в число

	if (isNaN(logId)) {
		return res.status(400).json({ error: 'Invalid ID format' })
	}

	try {
		const updatedLog = await prisma.exerciseLog.update({
			where: { id: logId }, // Передаем правильный id
			data: { isCompleted: true } // Обновляем статус на завершённый
		})

		res.json(updatedLog) // Возвращаем обновлённый объект
	} catch (error) {
		if (error.code === 'P2025') {
			// Prisma Error: Record not found
			return res.status(404).json({ error: 'Exercise log not found' })
		}
		res.status(500).json({ error: 'Failed to update exercise log' })
	}
}

// создать упражнение
export const createExercise = async (req, res) => {
	const { name, times } = req.body // Получаем данные из body

	try {
		const exercise = await prisma.exercise.create({
			data: {
				name,
				times,
				userId: req.user.id
			}
		})
		res.status(201).json(exercise)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

//get completed exercises
export const getCompletedExercises = async (req, res) => {
	const workoutLogID = +req.params.id
	try {
		const workoutLog = await prisma.workoutLog.findFirst({
			where: {
				id: workoutLogID
			},
			include: {
				exerciseLogs: true
			}
		})
		if (!workoutLog) {
			return res.status(202).json([])
		}
		const newArr = getLastUniqueExerciseIds(workoutLog.exerciseLogs)
		console.log(newArr)
		res.status(200).json(newArr)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

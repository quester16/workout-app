import { prisma } from '../../prisma.js'

export const getExercise = async (req, res) => {
	const exerciseId = +req.params.exerciseId

	console.log(exerciseId)
	try {
		const exercises = await prisma.exercise.findMany()
		res.status(200).json(exercises)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}

// Создать лог упражнения
export const createExerciseLog = async (req, res) => {
	const { workoutLogId, exerciseId } = req.body

	// Проверяем, существует ли workoutLog и exercise
	try {
		const workoutLog = await prisma.workoutLog.findUnique({
			where: { id: workoutLogId }
		})

		const exercise = await prisma.exercise.findUnique({
			where: { id: exerciseId }
		})
		console.log(workoutLog, exercise)
		if (!workoutLog || !exercise) {
			return res
				.status(400)
				.json({ error: 'Invalid workoutLogId or exerciseId' })
		}

		// Создаем ExerciseLog, если все проверки прошли успешно
		const exerciseLog = await prisma.exerciseLog.create({
			data: {
				workoutLogId,
				exerciseId
			}
		})

		res.json(exerciseLog)
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

export const createExercise = async (req, res) => {
	const { name, times } = req.body // Получаем данные из body

	try {
		const exercise = await prisma.exercise.create({
			data: {
				name,
				times
			}
		})
		res.status(201).json(exercise)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

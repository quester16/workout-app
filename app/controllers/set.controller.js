import { prisma } from '../prisma.js'

// Создать подходы для упражнения
export const createExerciseSet = async (req, res) => {
	const exerciseLogId = +req.params.logId // ID лога упражнения
	const sets = req.body // Массив с подходами [{ weight, repeat }, ...]

	try {
		// Удаляем старые подходы (если они есть)
		await prisma.exerciseSets.deleteMany({
			where: { exerciseLogId }
		})

		// Создаем новые подходы
		const createdSets = await prisma.exerciseSets.createMany({
			data: sets.map(set => ({
				exerciseLogId,
				weight: set.weight,
				repeat: set.repeat
			}))
		})

		// Обновляем лог упражнения (делаем его завершенным)
		await prisma.exerciseLog.update({
			where: { id: exerciseLogId },
			data: { isCompleted: true }
		})

		res.json(createdSets)
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to create exercise sets', text: error.message })
	}
}

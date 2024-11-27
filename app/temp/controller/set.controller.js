import { prisma } from '../../prisma.js'

// Создать подходы для упражнения
export const createExerciseSet = async (req, res) => {
	const logId = +req.params.logId // ID лога упражнения
	const sets = req.body // Массив с подходами [{ weight, repeat }, ...]

	console.log(req.body, logId)
	try {
		// Удаляем старые подходы (если они есть)
		await prisma.exerciseSets.deleteMany({
			where: { exerciseLogId: logId }
		})

		// Создаем новые подходы
		const createdSets = await prisma.exerciseSets.createMany({
			data: sets.map(set => ({
				exerciseLogId: logId,
				weight: set.weight,
				repeat: set.repeat
			}))
		})

		// Обновляем лог упражнения (делаем его завершенным)
		await prisma.exerciseLog.update({
			where: { id: logId },
			data: { isCompleted: true }
		})

		res.json(createdSets)
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to create exercise sets', text: error.message })
	}
}

import { prisma } from '../../prisma.js'

export const createExerciseSet = async (req, res) => {
	const exerciseId = +req.params.id
	const sets = req.body

	const exercise = await prisma.exercise.findUnique({
		where: { id: exerciseId }
	})

	if (!exercise) {
		return res.status(404).json({
			message: 'Exercise not found'
		})
	}

	// удаляем старые потому что create many добаляет новые данные к старым
	await prisma.exerciseSet.deleteMany({
		where: {
			exerciseId: exerciseId
		}
	})

	// создаем много записей
	const exerciseSet = await prisma.exerciseSet.createMany({
		data: sets.map(set => ({
			repeat: set.repeat, // маппим данные из запроса
			weight: set.weight,
			exerciseId: exerciseId // связываем с упражнением
		}))
	})

	res.json(exercise)
}

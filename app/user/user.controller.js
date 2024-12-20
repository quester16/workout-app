import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.util.js'

export const getUserProfile = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		select: UserFields
	})

	if (user) {
		const totalWorkouts = user.workoutLogs.reduce(
			(acc, obj) => (obj.isCompleted === true ? acc + 1 : acc),
			0
		)

		const exerciseLogs = await prisma.exerciseLog.findMany({
			where: {
				userId: user.id
			},
			select: {
				times: true
			}
		})
		const totalWeight = exerciseLogs[0].times.reduce(
			(acc, item) => (acc += item.weight),
			0
		)

		res.json({ user, totalWeight, totalWorkouts })
	} else {
		res.status(404).send('Not Found')
	}
}

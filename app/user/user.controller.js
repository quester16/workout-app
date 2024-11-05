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
		res.json(user)
	} else {
		res.status(404).send('Not Found')
	}
}

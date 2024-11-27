import jwt from 'jsonwebtoken'
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.util.js'

const authProtect = async (req, res, next) => {
	let token
	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]
	}
	if (token) {
		try {
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

			const user = await prisma.user.findUnique({
				where: { id: decodedToken.id },
				select: UserFields
			})

			if (user) {
				req.user = user
				next()
			} else {
				res.status(401).send('User not found')
			}
		} catch (err) {
			res.status(401).send('Token verification failed: ' + err.message)
		}
	} else {
		res.status(401).send('access error, token failed')
	}
}

export default authProtect

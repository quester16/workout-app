import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import jwt from 'jsonwebtoken'
import { token } from 'morgan'
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.util.js'

//login
export const authUser = async (req, res) => {
	const { email, password } = req.body
	const user = await prisma.user.findUnique({
		where: { email }
	})
	const decoded = await verify(user.password, password)
	if (user && decoded) {
		const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: '7d'
		})
		res.json({ user, token })
	} else {
		throw new Error('user has not found')
	}
}

//register
export const registerUser = async (req, res) => {
	const { email, password } = req.body

	const isUserExist = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (isUserExist) {
		res.status(401).json({
			message: `User already exists`
		})
	}

	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password),
			name: faker.internet.userName()
		},
		select: UserFields
	})

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: '7d'
	})
	res.json({ user, token })
}

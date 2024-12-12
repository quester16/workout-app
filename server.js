import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import authRoutes from './app/auth/auth.routes.js'
import { errorHandler, notFound } from './app/middlewares/error.middleware.js'
import { prisma } from './app/prisma.js'
import allRoutes from './app/routes/routes.js'
import userRoutes from './app/user/user.routes.js'

dotenv.config()
const app = express()

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	app.use(cors())
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
	app.use('/api/auth', authRoutes)
	app.use('/api/user', userRoutes)
	app.use('/api/', allRoutes)

	app.use(notFound)
	app.use(errorHandler)

	const port = process.env.PORT || 5554
	app.listen(port, () => {
		console.log(`Server started at http://localhost:${port}`)
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async err => {
		console.error(err)
		await prisma.$disconnect()
		process.exit(1)
	})

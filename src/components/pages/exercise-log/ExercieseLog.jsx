import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import WorkoutService from '../../../services/workout.service.js'
import Layout from '../../layout/Layout.jsx'
import { Button } from '../../ui/button/Button.jsx'
import { Loader } from '../../ui/loader/Loader.jsx'
import style from './ExercieseLog.module.scss'
import { ExerciseLogRows } from './exerciseLogRow/ExerciseLogRows.jsx'
import { useExerciseLog } from './useExerciseLog.js'

export const ExerciseLog = () => {
	const { id } = useParams()
	const { handleCreateExerciseLog } = useExerciseLog()

	const { data: workout, isLoading } = useQuery({
		queryKey: ['get log', id],
		queryFn: () => WorkoutService.getOneWorkout(id),
		select: ({ data }) => data
	})
	// 2. Стейт для хранения сетов
	const [sets, setSets] = useState([])
	const [isCompleted, setIsCompleted] = useState(false)

	// 3. useEffect для инициализации данных из localStorage или exercises
	useEffect(() => {
		if (!workout || !workout.exercise) return // Проверка наличия данных

		const savedValues = JSON.parse(localStorage.getItem(workout.exercise[0].id))
		if (savedValues && Array.isArray(savedValues)) {
			setSets(savedValues)
		} else {
			const currentExercise = workout.exercise.find(exer => exer.id === +id)
			console.log(workout.exercise)

			if (currentExercise) {
				const initialSets = Array.from({ length: currentExercise.sets }).map(
					(_, index) => ({
						id: index,
						repeat: 0,
						weight: 0
					})
				)
				setSets(initialSets) // Устанавливаем начальные данные
			}
		}
	}, [workout, id])

	// 4. useEffect для сохранения в localStorage при изменении sets
	useEffect(() => {
		if (sets && sets.length > 0) {
			localStorage.setItem(workout.exercise[0].id, JSON.stringify(sets))
		}
	}, [sets])

	// 5. Логика рендера
	if (isLoading) {
		return <Loader />
	}

	if (!workout || !workout.exercise) {
		console.warn('No exercise found')
		return <p>No exercises found</p>
	}

	const currentExercise = workout.exercise.find(exer => exer.id === +id)
	if (!currentExercise) {
		console.warn('Exercise not found')
		return <p>Exercise not found</p>
	}

	const generateActionRow = () => {
		return Array.from({ length: currentExercise.sets }).map((_, index) => {
			return (
				<ExerciseLogRows
					key={index}
					index={index}
					currentExercise={currentExercise}
					setSets={setSets}
					sets={sets}
				/>
			)
		})
	}

	return (
		<Layout>
			<div className={style.container}>
				<div className={style.header_title}>
					{currentExercise?.name}
					<div className={style.type}>{currentExercise?.exerciseType}</div>
				</div>
				<hr style={{ marginBottom: 20 }} />
				<div>
					<div className={style.row}>
						<div>
							<strong>Previous</strong>
						</div>
						<div>
							<strong>Weight & Repeats</strong>
						</div>
					</div>
					{generateActionRow()}
				</div>
				<div className={style.complete}>
					<Button
						type={'primary'}
						handleClick={() => handleCreateExerciseLog({ sets }, setSets)}
					>
						Сохранить
					</Button>
				</div>
			</div>
		</Layout>
	)
}

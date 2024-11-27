import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ExerciseService from '../../../services/exercise/exercise.service.js'
import Layout from '../../layout/Layout.jsx'
import { Button } from '../../ui/button/Button.jsx'
import { Loader } from '../../ui/loader/Loader.jsx'
import style from './ExercieseLog.module.scss'
import { ExerciseLogRows } from './exerciseLogRow/ExerciseLogRows.jsx'
import { useExerciseLog } from './useExerciseLog.js'

export const ExerciseLog = () => {
	const { id } = useParams()
	const { handleCreateExerciseLog } = useExerciseLog()

	const { data: exerciseLog, isLoading } = useQuery({
		queryKey: ['get log', id],
		queryFn: () => ExerciseService.getAllExercises(),
		select: ({ data }) => data
	})

	// 2. Стейт для хранения сетов
	const [sets, setSets] = useState([])

	// 3. useEffect для инициализации данных из localStorage или exercises
	useEffect(() => {
		if (!exerciseLog || !exerciseLog) return // Проверка наличия данных

		const savedValues = JSON.parse(localStorage.getItem(exerciseLog[id - 1].id))
		if (savedValues && Array.isArray(savedValues)) {
			setSets(savedValues)
		} else {
			const currentExercise = exerciseLog.find(exer => exer.id === +id)
			console.log('cur', currentExercise)

			if (currentExercise) {
				const initialSets = Array.from({ length: currentExercise.times }).map(
					(_, index) => ({
						id: index,
						repeat: 0,
						weight: 0
					})
				)
				setSets(initialSets) // Устанавливаем начальные данные
			}
		}
	}, [exerciseLog, id])

	// 4. useEffect для сохранения в localStorage при изменении sets
	useEffect(() => {
		if (sets && sets.length > 0) {
			localStorage.setItem(exerciseLog[id - 1].id, JSON.stringify(sets))
		}
	}, [sets])

	// 5. Логика рендера
	if (isLoading) {
		return <Loader />
	}

	if (!exerciseLog || !exerciseLog) {
		console.warn('No exercise found')
		return <p>No exercises found</p>
	}

	const currentExercise = exerciseLog.find(exer => exer.id === +id)
	if (!currentExercise) {
		console.warn('Exercise not found')
		return <p>Exercise not found</p>
	}

	const generateActionRow = () => {
		return Array.from({ length: currentExercise.times }).map((_, index) => {
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

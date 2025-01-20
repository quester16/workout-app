import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../layout/Layout.jsx'
import { Button } from '../../ui/button/Button.jsx'
import { Loader } from '../../ui/loader/Loader.jsx'
import style from './ExercieseLog.module.scss'
import { ExerciseLogRows } from './exerciseLogRow/ExerciseLogRows.jsx'
import { useExerciseLog } from './useExerciseLog.js'

export const ExerciseLog = () => {
	const { id } = useParams()
	const { handleCreateExerciseLog, exercise, isLoading } = useExerciseLog()

	// 2. Стейт для хранения сетов
	const [sets, setSets] = useState([])

	// 3. useEffect для инициализации данных из localStorage или exercises
	useEffect(() => {
		if (!exercise || !exercise) return // Проверка наличия данных
		const savedValues = JSON.parse(
			localStorage.getItem(exercise?.find(exer => exer.id === +id).name)
		)
		if (
			savedValues &&
			Array.isArray(savedValues) &&
			!savedValues[0].weight.includes('undefined')
		) {
			setSets(savedValues)
		} else {
			const currentExercise = exercise.find(exer => exer.id === +id)

			const indexOfTimes = currentExercise.exerciseLogs.length - 2
			if (
				currentExercise &&
				currentExercise.exerciseLogs[indexOfTimes]?.times.length
			) {
				const initialSets = Array.from({ length: currentExercise.times }).map(
					(_, index) => ({
						id: index,
						repeat:
							currentExercise.exerciseLogs[indexOfTimes]?.times[index].repeat,
						weight:
							currentExercise.exerciseLogs[indexOfTimes]?.times[index].weight +
							'kg'
					})
				)
				console.log(initialSets)
				setSets(initialSets) // Устанавливаем начальные данные
			} else {
				const initialState = Array.from({ length: currentExercise.times }).map(
					(_, index) => ({
						id: index,
						repeat: '0',
						weight: '0kg'
					})
				)
				setSets(initialState)
			}
		}
	}, [exercise, id])
	// 4. useEffect для сохранения в localStorage при изменении sets
	useEffect(() => {
		if (sets && sets.length > 0) {
			localStorage.setItem(
				exercise?.find(exer => exer.id === +id).name,
				JSON.stringify(sets)
			)
		}
	}, [exercise, id, sets])

	// 5. Логика рендера
	if (isLoading) {
		return <Loader />
	}

	if (!exercise || !exercise) {
		console.warn('No exercise found')
		return <p>No exercises found</p>
	}

	const currentExercise = exercise.find(exer => exer.id === +id)
	if (!currentExercise) {
		console.warn('Exercise not found')
		return <p>Exercise not found</p>
	}

	let exerciseLogId = currentExercise.exerciseLogs.slice(-1)[0].id
	let isCompleted = currentExercise.exerciseLogs.slice(-1)[0].isCompleted

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
					{!isCompleted && (
						<Button
							type={'primary'}
							handleClick={() =>
								handleCreateExerciseLog({ sets, id: exerciseLogId }, setSets)
							}
						>
							Сохранить
						</Button>
					)}
				</div>
			</div>
		</Layout>
	)
}

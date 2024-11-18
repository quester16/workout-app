import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Layout from '../../layout/Layout.jsx'
import { Button } from '../../ui/button/Button.jsx'
import style from './ExercieseLog.module.scss'
import { ExerciseLogRows } from './exerciseModal/ExerciseLogRows.jsx'
import { useExerciseLog } from './useExerciseLog.js'

export const ExerciseLog = () => {
	const { id } = useParams()
	const { handleCreateExerciseLog } = useExerciseLog()
	// let exercises
	// ;(async () => {
	// 	const { data } = await caxios(`http://localhost:5555/api/workout/${id}`)
	// 	exercises = data.exercises
	// })()

	// todo: исправть ошибку с перезагрузкой
	const { exercises } = useSelector(state => state.workout.workout)
	let currentExercise = exercises.filter(exer => exer.id === +id)

	const state = Array.from({ length: currentExercise[0]?.sets }).map(
		(_, index) => ({ id: index, repeat: 0, weight: 0 })
	)

	const [sets, setSets] = useState(() => state)

	const generateActionRow = () => {
		return Array.from({ length: currentExercise[0]?.sets }).map((_, index) => {
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
					{currentExercise[0]?.name}
					<div className={style.type}>{currentExercise[0]?.exerciseType}</div>
				</div>
				<hr style={{ marginBottom: 20 }} />
				<div>
					<div className={style.row}>
						<div>Previous</div>
						<div>Weight & Repeats</div>
					</div>
					{generateActionRow()}
				</div>
				<div className={style.complete}>
					<Button
						type={'primary'}
						handleClick={() => handleCreateExerciseLog(sets, id)}
					>
						Сохранить
					</Button>
				</div>
			</div>
		</Layout>
	)
}

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Layout from '../../layout/Layout.jsx'
import { Button } from '../../ui/button/Button.jsx'
import style from './ExercieseLog.module.scss'
import { ExerciseLogRows } from './exerciseModal/ExerciseLogRows.jsx'

export const ExerciseLog = () => {
	const { id } = useParams()
	const { exercises } = useSelector(state => state.workout.workout)
	let currentExercise = exercises.filter(exer => exer.id === +id)

	// todo: gather reps + weight + isChecked and maybe delete completed section

	const generateActionRow = () => {
		return Array.from({ length: currentExercise[0]?.sets }).map((_, index) => {
			return (
				<ExerciseLogRows
					key={index}
					index={index}
					currentExercise={currentExercise}
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
						<div>Completed</div>
					</div>
					{generateActionRow()}
				</div>
				<div className={style.complete}>
					<Button
						type={'primary'}
						// handleClick={() => console.log(exerciseSets)}
					>
						Сохранить
					</Button>
				</div>
			</div>
		</Layout>
	)
}

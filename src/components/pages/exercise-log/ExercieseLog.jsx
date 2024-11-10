import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Layout from '../../layout/Layout.jsx'
import { Button } from '../../ui/button/Button.jsx'
import NumberPicker from '../../ui/num-picker/NumPicker.jsx'
import style from './ExercieseLog.module.scss'

export const ExerciseLog = () => {
	const { id } = useParams()
	const [show, setShow] = useState(false)
	const [isChecked, setIsChecked] = useState(false)
	const [exerciseSets, setExerciseSets] = useState([])
	const { exercises } = useSelector(state => state.workout.workout)
	let currentExercise = exercises.filter(exer => exer.id === +id)

	// todo: gather reps + weight + isChecked
	const getValues = values => {
		// setExerciseSets(prevState => ({ values, isChecked }))
		console.log(exerciseSets)
	}

	const generateActionRow = () => {
		return Array.from({ length: currentExercise[0].sets }).map((_, index) => {
			return (
				<div className={style.action_row} key={index}>
					<div>
						{currentExercise[0]?.exerciseSet[index].weight +
							' kg/' +
							currentExercise[0]?.exerciseSet[index].repeat}
					</div>
					<Button type={'secondary'} handleClick={() => setShow(true)}>
						open
					</Button>
					{show && (
						<div className={style.modal}>
							<NumberPicker getValues={getValues} />
							<Button type={'primary'} handleClick={() => setShow(false)}>
								Done
							</Button>
						</div>
					)}
					<div style={{ width: 49 }}>
						<input
							className={style.checkbox}
							type={'checkbox'}
							onChange={() => setIsChecked(true)}
						/>
					</div>
				</div>
			)
		})
	}

	return (
		<Layout>
			<div className={style.container}>
				<div className={style.header_title}>
					{currentExercise[0].name}
					<div className={style.type}>{currentExercise[0].exerciseType}</div>
				</div>
				<hr style={{ marginBottom: 20 }} />
				<div>
					<div className={style.row}>
						<div>Previous</div>
						<div>Repeat & weight</div>
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

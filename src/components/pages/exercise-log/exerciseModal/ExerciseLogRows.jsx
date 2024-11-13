import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../../ui/button/Button.jsx'
import NumberPicker from '../../../ui/num-picker/NumPicker.jsx'
import style from '../ExercieseLog.module.scss'

// eslint-disable-next-line react/prop-types
export const ExerciseLogRows = ({ index, currentExercise }) => {
	const { id } = useParams()

	const [exerciseSets, setExerciseSets] = useState({})
	const [isChecked, setIsChecked] = useState(false)
	const [show, setShow] = useState(false)

	const getValues = updateSet => {
		setExerciseSets(updateSet)
	}

	return (
		<div className={style.action_row} key={index}>
			<div>
				{currentExercise[0].exerciseSet[index].weight +
					' kg/' +
					currentExercise[0].exerciseSet[index].repeat}
			</div>
			{Object.keys(exerciseSets).length ? (
				<p>
					{exerciseSets.weight} / {exerciseSets.repeat}
				</p>
			) : (
				<Button
					type={'secondary'}
					handleClick={() => {
						setShow(true)
						console.log(index)
					}}
				>
					open
				</Button>
			)}
			{show && (
				<div className={style.modal}>
					<NumberPicker getValues={getValues} setShow={setShow} />
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
}

import { useDispatch } from 'react-redux'
import useOnClickOutside from '../../../../hooks/useOnClickOutside.jsx'
import { setExerciseSets } from '../../../../redux/slices/workoutSlice.js'
import { Button } from '../../../ui/button/Button.jsx'
import NumberPicker from '../../../ui/num-picker/NumPicker.jsx'
import style from '../ExercieseLog.module.scss'

// eslint-disable-next-line react/prop-types
export const ExerciseLogRows = ({ index, currentExercise, setSets, sets }) => {
	const { ref, setIsOpen, isOpen } = useOnClickOutside(false)
	const dispatch = useDispatch()

	const getValues = updatedSet => {
		setSets(prevSets =>
			prevSets.map(set => (set.id === updatedSet.id ? updatedSet : set))
		)
		dispatch(setExerciseSets(updatedSet))
	}
	return (
		<div className={style.action_row} key={index}>
			<div>
				{currentExercise[0].exerciseSet[index].weight +
					'kg / ' +
					currentExercise[0].exerciseSet[index].repeat}
			</div>
			{Object.keys(sets[index]).length ? (
				<div className={style.action_col} onClick={() => setIsOpen(!isOpen)}>
					{sets[index].weight} / {sets[index].repeat}
				</div>
			) : (
				<Button type={'secondary'} handleClick={() => setIsOpen(!isOpen)}>
					to set
				</Button>
			)}
			{isOpen && (
				<div className={style.modal} ref={ref}>
					<NumberPicker
						getValues={getValues}
						setShow={setIsOpen}
						index={index}
						sets={sets}
					/>
				</div>
			)}
		</div>
	)
}

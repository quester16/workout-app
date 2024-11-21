import useOnClickOutside from '../../../../hooks/useOnClickOutside.jsx'
import NumberPicker from '../../../ui/num-picker/NumPicker.jsx'
import style from '../ExercieseLog.module.scss'

// eslint-disable-next-line react/prop-types
export const ExerciseLogRows = ({ index, currentExercise, setSets, sets }) => {
	const { ref, setIsOpen, isOpen } = useOnClickOutside(false)

	const getValues = updatedSet => {
		setSets(prevSets =>
			prevSets.map(set => (set.id === updatedSet.id ? updatedSet : set))
		)
	}
	return (
		<div className={style.action_row} key={index}>
			<div>
				{currentExercise.exerciseSet.length
					? currentExercise.exerciseSet[index].weight +
						'kg / ' +
						currentExercise.exerciseSet[index].repeat
					: '0kg/0'}
			</div>
			{sets[index] && (
				<div className={style.action_col} onClick={() => setIsOpen(!isOpen)}>
					{sets[index].weight} / {sets[index].repeat}
				</div>
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

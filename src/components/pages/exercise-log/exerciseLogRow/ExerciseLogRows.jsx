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
	// eslint-disable-next-line react/prop-types
	const indexOfTimes = currentExercise.exerciseLogs.length - 2

	return (
		<div className={style.action_row} key={index}>
			<div>
				{currentExercise.exerciseLogs[indexOfTimes]?.times.length
					? currentExercise.exerciseLogs[indexOfTimes]?.times[index].weight +
						'kg / ' +
						currentExercise.exerciseLogs[indexOfTimes]?.times[index].repeat
					: '0kg/0'}
			</div>
			{sets[index] && (
				<div className={style.action_col} onClick={() => setIsOpen(!isOpen)}>
					{sets[index].weight || '0kg / '} / {sets[index].repeat || '0'}
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

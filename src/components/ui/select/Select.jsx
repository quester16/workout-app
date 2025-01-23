import { Controller } from 'react-hook-form'
import Select from 'react-select'
import { useExerciseList } from '../../hoc/useExerciseList.js'
import { customStyles } from './SelectCustomStyles.js'

export const ReactSelect = ({ isMulti = false, control }) => {
	const { data } = useExerciseList()
	const exerciseOptions = [
		'chest',
		'shoulder',
		'back',
		'legs',
		'bicep',
		'triceps'
	]

	return (
		<Controller
			control={control}
			name="select"
			render={({ field: { value, onChange } }) => (
				<Select
					styles={customStyles}
					options={
						isMulti
							? data?.data?.map(exercise => ({
									value: exercise.id,
									label: exercise.name
								}))
							: exerciseOptions.map((val, id) => ({
									value: id,
									label: val
								}))
					}
					value={value}
					onChange={onChange}
					isMulti={isMulti}
				/>
			)}
		/>
	)
}

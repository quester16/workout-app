import { useState } from 'react'
import Picker from 'react-mobile-picker'

// todo: make a num generate function for weight and reps
const nums = type => {
	const arr = []
	for (let i = 0; i < 100; i++) {
		arr.push(i)
	}
	if (type === 'reps') return arr
	return arr.map(num => num + 'kg')
}

const selections = {
	repeat: nums('reps'),
	weight: nums('weight')
}

// eslint-disable-next-line react/prop-types
function NumberPicker({ getValues }) {
	const [pickerValue, setPickerValue] = useState({
		// reps: 4,
		// weight: '6kg'
	})
	getValues(pickerValue)
	return (
		<Picker value={pickerValue} onChange={setPickerValue}>
			{Object.keys(selections).map(name => (
				<Picker.Column key={name} name={name}>
					{selections[name].map(option => (
						<Picker.Item key={option} value={option}>
							{option}
						</Picker.Item>
					))}
				</Picker.Column>
			))}
		</Picker>
	)
}

export default NumberPicker

import { useState } from 'react'
import Picker from 'react-mobile-picker'
import { Button } from '../button/Button.jsx'

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
function NumberPicker({ getValues, setShow }) {
	const [pickerValue, setPickerValue] = useState({
		repeat: 0,
		weight: 0
	})
	const handleSubmit = () => {
		getValues(pickerValue)
		setShow(false)
	}

	return (
		<>
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
			<Button type={'primary'} handleClick={handleSubmit}>
				Done
			</Button>
		</>
	)
}

export default NumberPicker

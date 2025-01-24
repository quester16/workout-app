import { useState } from 'react'
import Picker from 'react-mobile-picker'
import { Button } from '../button/Button.jsx'

const nums = type => {
	const arr = []
	for (let i = 0; i < 500; i++) {
		arr.push(i)
	}
	if (type === 'reps') return arr
	return arr.map(num => num + 'kg')
}

const selections = {
	repeat: nums('reps'),
	weight: nums('weight')
}

function NumberPicker({ getValues, setShow, sets, index }) {
	const [pickerValue, setPickerValue] = useState(
		sets
			? sets[index]
			: {
					repeat: 0,
					weight: 0
				}
	)
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

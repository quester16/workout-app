import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	workout: {},
	exerciseSets: []
}

const workoutSlice = createSlice({
	name: 'workout',
	initialState,
	reducers: {
		setWorkout: (state, action) => {
			state.workout = action.payload
		},
		setExerciseSets: (state, action) => {
			state.exerciseSets = state.exerciseSets.map((exer, index) => {
				exer.id === action.payload.id
					? (state.exerciseSets[index] = action.payload)
					: state.exerciseSets.push(action.payload)
			})
		}
	}
})

export default workoutSlice.reducer

export const { setWorkout, setExerciseSets } = workoutSlice.actions

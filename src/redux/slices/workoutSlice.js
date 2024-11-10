import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	workout: {}
}

const workoutSlice = createSlice({
	name: 'workout',
	initialState,
	reducers: {
		setWorkout: (state, action) => {
			state.workout = action.payload
		}
	}
})

export default workoutSlice.reducer

export const { setWorkout } = workoutSlice.actions

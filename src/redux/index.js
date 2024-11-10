import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice.js'
import workoutSlice from './slices/workoutSlice.js'

const store = configureStore({
	reducer: { auth: authSlice, workout: workoutSlice }
})

export default store

import { caxios } from '../api.js'

class WorkoutService {
	getAllWorkouts() {
		return caxios.get('/workouts')
	}
	getOneWorkout(id) {
		return caxios.get(`/workout/${id}`)
	}
	createWorkout(data) {
		return caxios.post('/workout', data)
	}
	createWorkoutLog(data) {
		console.log(data)
		return caxios.post('/workout/log', data)
	}
	updateWorkout(id, data) {
		return caxios.put(`/workout/${id}`, data)
	}
	deleteWorkout(id) {
		return caxios.delete(`/workout/${id}`)
	}
}

export default new WorkoutService()

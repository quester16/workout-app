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
		return caxios.post('/workout/log', data)
	}
	completeWorkout(id) {
		return caxios.patch(`/workout/log/${id}/complete`)
	}
	deleteWorkout(id) {
		return caxios.delete(`/workout/${id}`)
	}
}

export default new WorkoutService()

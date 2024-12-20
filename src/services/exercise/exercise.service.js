import { caxios } from '../../api.js'

class ExerciseService {
	getAllExercises() {
		return caxios.get('/exercise')
	}
	createExercise(data) {
		return caxios.post('/exercise', data)
	}
	updateExercise(id, data) {
		return caxios.put(`/exercise/${id}`, data)
	}
	deleteExercise(id) {
		return caxios.delete(`/exercise/${id}`)
	}
	// create exercise log
	createLogExercise(data) {
		return caxios.post(`/exercise/log`, {
			workoutLogId: +data.workoutLogId,
			exerciseId: +data.data
		})
	}

	getIsCompletedExercise(id) {
		return caxios.get(`/exercises/completed/${id}`)
	}

	createSets(data) {
		return caxios.post(`/exercise/set/${data.id}`, data.data)
	}
}

export default new ExerciseService()

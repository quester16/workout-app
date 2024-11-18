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
	// get exercise log
	createLogExercise(data, id) {
		return caxios.post(`/exercise/set/${id}`, data)
	}
}

export default new ExerciseService()

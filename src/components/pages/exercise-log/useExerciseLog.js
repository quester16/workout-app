import { useMutation } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { caxios } from '../../../api.js'
import ExerciseService from '../../../services/exercise/exercise.service.js'

export const useExerciseLog = () => {
	const navigate = useNavigate()
	const { id } = useParams()

	const { mutate } = useMutation({
		mutationFn: ({ data, id }) => ExerciseService.createLogExercise(data, id),
		onSuccess: () => {
			// navigate(`/workout/${id}`)
		}
	})

	const handleCreateExerciseLog = (data, id) => {
		mutate({ data, id })
		// console.log(data, id)
	}

	let exercises
	const query = async () => {
		const { data } = await caxios(`http://localhost:5555/api/workout/${id}`)
		exercises = data.exercises
	}

	return {
		handleCreateExerciseLog,
		exercises
	}
}

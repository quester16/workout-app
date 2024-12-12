import { useMutation } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import ExerciseService from '../../../services/exercise/exercise.service.js'

export const useExerciseLog = () => {
	const navigate = useNavigate()
	const { id } = useParams()

	const { mutate } = useMutation({
		mutationFn: data => {
			ExerciseService.createSets(data)
		},
		onSuccess: () => {
			navigate(`/workout/${id}`)
		}
	})

	const handleCreateExerciseLog = (data, setSets) => {
		const newData = data.sets.map((item, i, arr) => ({
			...item,
			weight:
				typeof arr[i].weight === 'string'
					? +arr[i].weight.match(/\d+/)[0]
					: arr[i].weight
		}))
		mutate({ data: newData, id: data.id })

		// setSets(prev =>
		// 	prev.map((_, index) => ({ id: index, repeat: 0, weight: 0 }))
		// )
	}
	return {
		handleCreateExerciseLog
	}
}

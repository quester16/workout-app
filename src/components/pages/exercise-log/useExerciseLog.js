import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import ExerciseService from '../../../services/exercise/exercise.service.js'

export const useExerciseLog = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const queryClient = useQueryClient()
	const { data: exercise, isLoading } = useQuery({
		queryKey: ['get log', id],
		queryFn: () => ExerciseService.getAllExercises(),
		select: ({ data }) => data
	})

	const { mutate } = useMutation({
		mutationFn: ({ data, id }) => {
			ExerciseService.createSets(data, id)
		},
		onSuccess: () => {
			queryClient.removeQueries('exercise completed flag')
			const currentExercise = exercise.find(exer => exer.id === +id)
			const workoutId =
				currentExercise.exerciseLogs.slice(-1)[0].workoutLog.workoutId

			navigate(`/workout/${workoutId}`)
		}
	})

	const handleCreateExerciseLog = data => {
		const newData = data.sets.map((item, i, arr) => ({
			...item,
			repeat: +item.repeat,
			weight:
				typeof arr[i].weight === 'string'
					? +arr[i].weight.match(/\d+/)[0]
					: arr[i].weight
		}))

		mutate({ data: newData, id: data.id })
	}

	return {
		handleCreateExerciseLog,
		exercise,
		isLoading
	}
}

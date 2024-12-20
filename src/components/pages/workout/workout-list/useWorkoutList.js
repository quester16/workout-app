import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import WorkoutService from '../../../../services/workout.service.js'

export const useWorkoutList = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { data } = useQuery({
		queryKey: ['workout-list'],
		queryFn: () => WorkoutService.getAllWorkouts(),
		select: ({ data }) => data
	})
	const { mutate, error } = useMutation({
		mutationFn: id => WorkoutService.createWorkoutLog(id),
		onSuccess: workout => {
			queryClient.removeQueries('exercise completed flag')
			navigate('/workout/' + workout.data.workoutId)
		}
	})

	const handleClick = id => {
		mutate({ id })
	}

	return {
		handleClick,
		data,
		error
	}
}

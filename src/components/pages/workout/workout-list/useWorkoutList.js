import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import WorkoutService from '../../../../services/workout.service.js'

export const useWorkoutList = () => {
	const navigate = useNavigate()

	const { data } = useQuery({
		queryKey: ['workout-list'],
		queryFn: () => WorkoutService.getAllWorkouts(),
		select: ({ data }) => data
	})
	const { mutate } = useMutation({
		mutationFn: id => WorkoutService.createWorkoutLog(id)
	})
	const handleClick = id => {
		navigate('/workout/' + id)
		mutate({ id })
	}

	return {
		handleClick,
		data
	}
}

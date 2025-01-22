import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UserService from '../../../services/user.service.js'
import WorkoutService from '../../../services/workout.service.js'

export const useProfile = () => {
	const queryClient = useQueryClient()

	// Обновить данные
	queryClient.invalidateQueries('profile')

	const { data: profile, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => UserService.getProfile(),
		select: ({ data }) => data,
		refetchOnMount: true
	})

	const { data: allWorkouts } = useQuery({
		queryKey: ['workoutList'],
		queryFn: () => WorkoutService.getAllWorkouts(),
		select: ({ data }) => data
	})

	const { mutate: MremoveWorkout } = useMutation({
		mutationKey: ['deleteWorkout'],
		mutationFn: id => WorkoutService.deleteWorkout(id)
	})

	return {
		profile,
		allWorkouts,
		MremoveWorkout,
		isLoading
	}
}

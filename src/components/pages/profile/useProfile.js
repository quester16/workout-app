import { useMutation, useQuery } from '@tanstack/react-query'
import UserService from '../../../services/user.service.js'
import WorkoutService from '../../../services/workout.service.js'

export const useProfile = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: UserService.getProfile,
		select: ({ data }) => data
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
		data,
		allWorkouts,
		MremoveWorkout,
		isLoading
	}
}

import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setWorkout } from '../../../../redux/slices/workoutSlice.js'
import WorkoutService from '../../../../services/workout.service.js'

export const useSingleWorkout = () => {
	const dispatch = useDispatch()
	const { id } = useParams()

	const { data } = useQuery({
		queryKey: ['exercise-log'],
		queryFn: () => WorkoutService.getOneWorkout(id),
		select: ({ data }) => data
	})
	dispatch(setWorkout(data))

	return {
		data
	}
}

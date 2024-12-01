import { useMutation, useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setWorkout } from '../../../../redux/slices/workoutSlice.js'
import ExerciseService from '../../../../services/exercise/exercise.service.js'
import WorkoutService from '../../../../services/workout.service.js'

export const useSingleWorkout = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const navigate = useNavigate()

	const { data } = useQuery({
		queryKey: ['exercise-log'],
		queryFn: () => WorkoutService.getOneWorkout(id),
		select: ({ data }) => data
	})
	dispatch(setWorkout(data))

	let workoutLogId = data?.workoutLogs[0].id

	const { mutate } = useMutation({
		mutationFn: data =>
			ExerciseService.createLogExercise({ data, workoutLogId }),
		onSuccess: data => {
			navigate('/exercise/' + data.data.exerciseId)
		}
	})

	const handleMutate = (exId, isCompleted) => {
		if (isCompleted) {
			navigate('/exercise/' + exId)
		} else mutate(exId)
	}

	return {
		data,
		handleMutate
	}
}

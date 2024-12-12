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

	const workout = useQuery({
		queryKey: ['exercise-log'],
		queryFn: () => WorkoutService.getOneWorkout(id),
		select: ({ data }) => data
	})
	dispatch(setWorkout(workout.data))
	let workoutLogId = workout?.data?.workoutLogs.slice(-1)[0].id

	const isCompleted = useQuery({
		queryKey: ['exercise completed flag'],
		queryFn: () => ExerciseService.getIsCompletedExercise(workoutLogId),
		select: ({ data }) => data,
		enabled: !!workoutLogId
	})

	const { mutate: createLogExercise } = useMutation({
		mutationFn: data =>
			ExerciseService.createLogExercise({ data, workoutLogId }),
		onSuccess: data => {
			navigate('/exercise/' + data.data.exerciseId)
		}
	})

	const { mutate: completeWorkout } = useMutation({
		mutationFn: data => WorkoutService.completeWorkout(data),
		onSuccess: () => {
			navigate('/workouts')
		}
	})

	const handleMutate = (exId, isCompleted) => {
		console.log(isCompleted)
		if (isCompleted) {
			navigate('/exercise/' + exId)
		} else createLogExercise(exId)
	}

	const handleCompleteWorkout = workoutLogId => {
		if (isCompleted.data[0] === true && !isCompleted.data[1] === true) {
			completeWorkout(workoutLogId)
		} else alert('завершите упражнение')
	}

	return {
		isCompleted,
		workout,
		handleMutate,
		handleCompleteWorkout
	}
}

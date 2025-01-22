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

	const { data: workout, isLoading } = useQuery({
		queryKey: ['exercise-log'],
		queryFn: () => WorkoutService.getOneWorkout(id),
		select: ({ data }) => data
	})
	dispatch(setWorkout(workout))
	let workoutLogId = workout?.workoutLogs.slice(-1)[0].id

	const { data: isCompleted, isPending: isCompletedPending } = useQuery({
		queryKey: ['exercise completed flag'],
		queryFn: () => ExerciseService.getIsCompletedExercise(workoutLogId),
		refetchOnMount: true,
		select: ({ data }) => data,
		enabled: !!workoutLogId
	})

	const { mutate: createLogExercise, isPending } = useMutation({
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
		if (isCompleted) {
			navigate('/exercise/' + exId)
		} else createLogExercise(exId)
	}

	const handleCompleteWorkout = workoutLogId => {
		const allTrue = isCompleted.every(obj => Object.values(obj)[0] === true)
		if (allTrue) {
			completeWorkout(workoutLogId)
		} else alert('завершите упражнение')
	}

	return {
		isCompleted,
		isCompletedPending,
		workout,
		isLoading,
		handleMutate,
		handleCompleteWorkout,
		isPending
	}
}

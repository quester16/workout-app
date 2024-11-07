import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import WorkoutService from '../../../../services/workout.service.js'
import Layout from '../../../layout/Layout.jsx'
import style from './SingleWorkout.module.scss'

export const SingleWorkout = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	// todo: нодо сделать правильное id для сервиса
	const { data, status } = useQuery({
		queryKey: ['exercise-log'],
		queryFn: () => WorkoutService.getOneWorkout(3),
		select: ({ data }) => data
	})

	return (
		<Layout>
			<div className={style.container}>
				<div className={style.header_title}>
					<div className={style.min}>{data?.minutes} minutes</div>
					{data?.name}
				</div>
				{data?.exercises.map(ex => (
					<div
						className={style.exercise_card}
						key={ex.id}
						onClick={() => navigate('/exercise/' + ex.id)}
					>
						<div>{ex.name}</div>
						<div className={style.type}>{ex.exerciseType}</div>
					</div>
				))}
			</div>
		</Layout>
	)
}

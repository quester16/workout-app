import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import WorkoutService from '../../../../services/workout.service.js'
import Layout from '../../../layout/Layout.jsx'
import style from './WorkoutList.module.scss'

export const WorkoutList = () => {
	const navigate = useNavigate()

	const { data } = useQuery({
		queryKey: ['workout-list'],
		queryFn: () => WorkoutService.getAllWorkouts(),
		select: ({ data }) => data
	})

	return (
		<Layout>
			<div className={style.container}>
				<div className={style.header_title}>Список тренировок</div>
				{data?.map(workout => (
					<div
						key={workout.id}
						className={style.workout_card}
						onClick={() => navigate('/workout/' + workout.id)}
					>
						<div className={style.title}>{workout.name}</div>
					</div>
				))}
			</div>
		</Layout>
	)
}

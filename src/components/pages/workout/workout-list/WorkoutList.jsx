import Layout from '../../../layout/Layout.jsx'
import { Notification } from '../../../notification/Notification.jsx'
import { useWorkoutList } from './useWorkoutList.js'
import style from './WorkoutList.module.scss'

export const WorkoutList = () => {
	const { handleClick, data, error } = useWorkoutList()

	return (
		<Layout>
			<div className={style.container}>
				<div className={style.header_title}>Список тренировок</div>
				{error && (
					<Notification
						message={
							'Произошла ошибка при получении тренировки, пожалуйста перезагрузите сайт!'
						}
						success={false}
					/>
				)}
				{data?.map(workout => (
					<div
						key={workout.id}
						className={style.workout_card}
						onClick={() => handleClick(workout.id)}
					>
						<div className={style.title}>{workout.name}</div>
					</div>
				))}
			</div>
		</Layout>
	)
}

import { useNavigate } from 'react-router-dom'
import Layout from '../../../layout/Layout.jsx'
import { Notification } from '../../../notification/Notification.jsx'
import { Button } from '../../../ui/button/Button.jsx'
import { useWorkoutList } from './useWorkoutList.js'
import style from './WorkoutList.module.scss'

export const WorkoutList = () => {
	const { handleClick, data, error } = useWorkoutList()
	const navigate = useNavigate()

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
				{data?.length ? (
					data?.map(workout => {
						let day = new Date(
							workout.workoutLogs.slice(-1)[0].createdAt
						).getDate()
						let month = new Date(
							workout.workoutLogs.slice(-1)[0].createdAt
						).getMonth()
						return (
							<div
								key={workout.id}
								className={style.workout_card}
								onClick={() => handleClick(workout.id)}
							>
								<div className={style.lower_title}>
									последнее выпол. -{' '}
									{Intl.DateTimeFormat('ru-RU', {
										month: 'short'
									}).format(month)}{' '}
									{day}
								</div>
								<div className={style.title}>{workout.name} </div>
							</div>
						)
					})
				) : (
					<Button type={'primary'} handleClick={() => navigate('/new-workout')}>
						Создать Тренировку
					</Button>
				)}
			</div>
		</Layout>
	)
}

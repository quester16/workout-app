import { useNavigate } from 'react-router-dom'
import Layout from '../../../layout/Layout.jsx'
import { Notification } from '../../../notification/Notification.jsx'
import { Button } from '../../../ui/button/Button.jsx'
import { Loader } from '../../../ui/loader/Loader.jsx'
import { useWorkoutList } from './useWorkoutList.js'
import style from './WorkoutList.module.scss'

export const WorkoutList = () => {
	const { handleClick, data, error, isLoading, isPending } = useWorkoutList()
	const navigate = useNavigate()

	const sortedWorkouts = data?.sort((a, b) => {
		const dateA = new Date(a.workoutLogs.slice(-1)[0]?.createdAt || 0)
		const dateB = new Date(b.workoutLogs.slice(-1)[0]?.createdAt || 0)
		return dateA - dateB // Для сортировки по возрастанию
	})

	if (isPending) return <Loader />
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
				{isLoading && (
					<div>
						<img src={'loader.gif'} alt="loading.gif" />
					</div>
				)}
				{sortedWorkouts?.length
					? sortedWorkouts?.map(workout => {
							return (
								<div
									key={workout.id}
									className={style.workout_card}
									onClick={() => handleClick(workout.id)}
								>
									<div className={style.title}>{workout.name} </div>
								</div>
							)
						})
					: !isLoading && (
							<Button
								type={'primary'}
								handleClick={() => navigate('/new-workout')}
							>
								Создать Тренировку
							</Button>
						)}
			</div>
		</Layout>
	)
}

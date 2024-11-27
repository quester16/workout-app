import Layout from '../../../layout/Layout.jsx'
import { useWorkoutList } from './useWorkoutList.js'
import style from './WorkoutList.module.scss'

export const WorkoutList = () => {
	const { handleClick, data } = useWorkoutList()

	return (
		<Layout>
			<div className={style.container}>
				<div className={style.header_title}>Список тренировок</div>
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

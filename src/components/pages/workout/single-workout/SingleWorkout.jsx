import cn from 'clsx'
import Layout from '../../../layout/Layout.jsx'
import { Button } from '../../../ui/button/Button.jsx'
import style from './SingleWorkout.module.scss'
import { useSingleWorkout } from './useSingleWorkout.js'

export const SingleWorkout = () => {
	const { handleMutate, isCompleted, workout, handleCompleteWorkout } =
		useSingleWorkout()

	return (
		<Layout>
			<div className={style.container}>
				<div className={style.header_title}>
					{/*<div className={style.min}>{workout?.data.minutes} minutes</div>*/}
					{workout?.data?.name}
				</div>
				{workout?.data?.exercises.map(ex => {
					return (
						<div
							className={cn(style.exercise_card, {
								[style.completed]: isCompleted?.data?.find(el => el[ex.id])
							})}
							key={ex.id}
							onClick={() =>
								handleMutate(
									ex.id,
									isCompleted.data.find(el => el[ex.id])
								)
							}
						>
							<div>{ex.name}</div>
							<div className={style.type}>{ex.exerciseType}</div>
						</div>
					)
				})}
				<Button
					type={'primary'}
					handleClick={() =>
						handleCompleteWorkout(workout.data?.workoutLogs.slice(-1)[0].id)
					}
				>
					Завершить
				</Button>
			</div>
		</Layout>
	)
}

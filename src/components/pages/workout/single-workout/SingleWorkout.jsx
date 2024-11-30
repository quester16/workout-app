import cn from 'clsx'
import Layout from '../../../layout/Layout.jsx'
import style from './SingleWorkout.module.scss'
import { useSingleWorkout } from './useSingleWorkout.js'

export const SingleWorkout = () => {
	const { data, handleMutate } = useSingleWorkout()

	return (
		<Layout>
			<div className={style.container}>
				<div className={style.header_title}>
					<div className={style.min}>{data?.minutes} minutes</div>

					{data?.name}
				</div>
				{data?.exercises.map(ex => {
					let isCompleted = ex.exerciseLogs.slice(-1)[0].isCompleted
					return (
						<div
							className={cn(style.exercise_card, {
								[style.completed]: isCompleted
							})}
							key={ex.id}
							onClick={() => handleMutate(ex.id, isCompleted)}
						>
							<div>{ex.name}</div>
							<div className={style.type}>{ex.exerciseType}</div>
						</div>
					)
				})}
			</div>
		</Layout>
	)
}

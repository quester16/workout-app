import { useNavigate } from 'react-router-dom'
import Layout from '../../../layout/Layout.jsx'
import style from './SingleWorkout.module.scss'
import { useSingleWorkout } from './useSingleWorkout.js'

export const SingleWorkout = () => {
	const navigate = useNavigate()

	const { data } = useSingleWorkout()

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

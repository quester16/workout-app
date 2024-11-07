import { useQuery } from '@tanstack/react-query'
import Layout from '../../layout/Layout.jsx'
import style from './ExercieseLog.module.scss'
import ExerciseService from '../../../services/exercise/exercise.service.js'
import { useParams } from 'react-router-dom'
import NumberPicker from '../../ui/num-picker/NumPicker.jsx'

export const ExercieseLog = () => {
	const { id } = useParams()

	// const { data } = useQuery({
	// 	queryKey: ['exercise-log'],
	// 	queryFn: () => ExerciseService.getLogExercise(id)
	// })

	return (
		<Layout>
			<div className={style.container}>
				<div className={style.header_title}>
					Название упражнение
					<div className={style.type}> тип</div>
				</div>
				<hr style={{ marginBottom: 20 }} />
				<div className={style.table}>
					<div className={style.row}>
						<div>Previous</div>
						<div>Repeat & weight</div>
						<div>Completed</div>
					</div>
					<div className={style.action_row}>
						<div>Previous data</div>
						<div>
							<NumberPicker />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

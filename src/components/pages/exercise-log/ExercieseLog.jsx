import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../layout/Layout.jsx'
import { Button } from '../../ui/button/Button.jsx'
import NumberPicker from '../../ui/num-picker/NumPicker.jsx'
import style from './ExercieseLog.module.scss'

export const ExercieseLog = () => {
	const { id } = useParams()
	const [show, setShow] = useState(false)

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
						<div>10kg/6</div>
						<Button type={'secondary'} handleClick={() => setShow(true)}>open</Button>
						{show &&
							<div className={style.modal}>
							<NumberPicker />
						<Button type={'primary'} handleClick={() =>setShow(false)}>Done</Button>
						</div>
						
						}
						<div className={style.self}>
						<input className={style.checkbox} type={'checkbox'}/>
						</div>
					</div>
				</div>
				<div className={style.complete}>
				
				<Button type={'primary'}>Сохранить</Button>
				</div>
			</div>
		</Layout>
	)
}

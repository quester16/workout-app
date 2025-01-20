import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth.jsx'
import Layout from '../../layout/Layout.jsx'
import { Button } from '../../ui/button/Button.jsx'
import style from './Home.module.scss'

function Home() {
	const navigate = useNavigate()
	const { isAuth } = useAuth()
	return (
		<Layout>
			<div className={style.home}>
				<div className={style.heading}>
					<p>No</p>
					<p>Pain</p>
					<p>No</p>
					<p>Gain</p>
				</div>
				<Button
					className={style.home}
					type={'primary'}
					handleClick={() => navigate(isAuth ? '/workouts' : '/auth')}
				>
					{isAuth ? 'Тренировки' : 'Sing Up'}
				</Button>
			</div>
		</Layout>
	)
}

export default Home

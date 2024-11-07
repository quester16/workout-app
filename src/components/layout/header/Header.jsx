import { FaRegUser } from 'react-icons/fa'
import { MdArrowBack } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth.jsx'
import Hamburger from './Hamburger/Hamburger.jsx'
import style from './Header.module.scss'

const Header = () => {
	const { pathname } = useLocation()
	const { isAuth } = useAuth()
	const navigate = useNavigate()
	return (
		<div className={style.header}>
			{pathname !== '/' ? (
				<button>
					<div onClick={() => navigate(-1)}>
						<MdArrowBack style={{ fontSize: '2rem' }} />
					</div>
				</button>
			) : (
				<button>
					<div
						onClick={() => (isAuth ? navigate('/profile') : navigate('/auth'))}
					>
						<FaRegUser style={{ fontSize: '2rem' }} />
					</div>
				</button>
			)}
			<Hamburger />
		</div>
	)
}

export default Header

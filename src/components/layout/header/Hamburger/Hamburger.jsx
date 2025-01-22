import cn from 'clsx'
import Cookies from 'js-cookie'
import { RiCloseFill, RiMenu3Fill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { TOKEN } from '../../../../app.constans.js'
import useOnClickOutside from '../../../../hooks/useOnClickOutside.jsx'
import { setIsAuth } from '../../../../redux/slices/authSlice.js'
import style from './Hamburger.module.scss'
import { menu } from './menu.data.js'

const Hamburger = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleLogout = () => {
		const isLogout = confirm('Вы уверены')
		if (isLogout) {
			Cookies.remove(TOKEN)
			dispatch(setIsAuth(false))
			navigate('/auth')
		}
	}

	const { isOpen, setIsOpen, ref } = useOnClickOutside(false)
	return (
		<div className={style.hamburger} ref={ref}>
			<button onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? (
					<RiCloseFill style={{ fontSize: '2rem' }} />
				) : (
					<RiMenu3Fill style={{ fontSize: '2rem' }} />
				)}
			</button>

			<div className={cn(style.menu, { [style.show]: isOpen })}>
				<div>
					<ul>
						{menu.map((item, index) => (
							<li className={style.list_item} key={index}>
								<Link to={item.link} key={index}>
									{item.title}
								</Link>
							</li>
						))}
						<li className={style.list_item}>
							<a onClick={handleLogout}>Выйти</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Hamburger

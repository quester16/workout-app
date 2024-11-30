import style from './Notification.module.scss'

// eslint-disable-next-line react/prop-types
export const Notification = ({ message, success, isAuth = false }) => {
	return (
		<div className={style.notification}>
			{success && <h3 style={{ color: '#28a745' }}>{message} </h3>}
			{!success && <h3 style={{ color: '#e63946' }}>{message} </h3>}
			{isAuth && <h3 style={{ color: '#e63946' }}>Не удалось войти!</h3>}
		</div>
	)
}

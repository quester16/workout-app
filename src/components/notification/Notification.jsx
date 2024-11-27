import style from './Notification.module.scss'

// eslint-disable-next-line react/prop-types
export const Notification = ({ type, success }) => {
	return (
		<div className={style.notification}>
			{success && type !== 'auth' ? (
				<h3 style={{ color: '#28a745' }}>
					{type === 'workout' ? 'Тренировка' : 'Упражнение'} успешно добавлено!
				</h3>
			) : (
				type !== 'auth' && (
					<h3 style={{ color: '#e63946' }}>
						{type === 'workout' ? 'Тренировка' : 'Упражнение'} не добавлено!
					</h3>
				)
			)}
			{type === 'auth' && (
				<h3 style={{ color: '#e63946' }}>Не удалось войти!</h3>
			)}
		</div>
	)
}

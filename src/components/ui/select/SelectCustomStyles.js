export const customStyles = {
	control: (provided, state) => ({
		...provided,
		maxWidth: '400px', // Фиксированная ширина для select
		margin: '0 auto 20px',
		backgroundColor: '#1c1c1e', // Темный фон
		borderColor: state.isFocused ? '#28a745' : '#1e90ff', // Зеленый при фокусе, синий по умолчанию
		color: 'white', // Светлый текст
		padding: '8px',
		borderRadius: '8px',
		boxShadow: state.isFocused ? '0 0 0 1px #28a745' : 'none',
		'&:hover': {
			borderColor: '#ff6347' // Оранжевый при наведении
		}
	}),
	singleValue: provided => ({
		...provided,
		color: '#f8f9fa' // Светлый текст для выбранного значения
	}),
	menu: (provided, state) => ({
		...provided,
		maxWidth: '400px', // Фиксированная ширина для меню
		// borderColor: state.isFocused ? "#28a745" : "#1e90ff",
		backgroundColor: '#2c2c2e', // Темный фон выпадающего меню
		borderRadius: '8px',
		margin: '4px auto 0'
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected
			? '#28a745' // Зеленый фон для выбранного значения
			: state.isFocused
				? '#1e90ff' // Синий при наведении
				: '#2c2c2e', // Темный фон по умолчанию
		color: state.isSelected || state.isFocused ? '#f8f9fa' : '#a9a9a9', // Светлый текст для фокуса и выделения
		borderColor: state.isSelected ? '#fff' : '#28a745',
		padding: '12px',
		cursor: 'pointer',
		'&:active': {
			backgroundColor: '#ff6347' // Оранжевый при нажатии
		}
	}),
	placeholder: provided => ({
		...provided,
		color: '#a9a9a9' // Светло-серый текст для плейсхолдера
	}),
	dropdownIndicator: (provided, state) => ({
		...provided,
		color: state.isFocused ? '#28a745' : '#f8f9fa', // Зеленый при фокусе, светлый по умолчанию
		'&:hover': {
			color: '#ff6347' // Оранжевый при наведении
		}
	}),
	indicatorSeparator: provided => ({
		...provided,
		backgroundColor: '#343a40' // Тонкая серая линия
	})
}

import { Link } from 'react-router-dom'

export const NotFound = () => {
	return (
		<div>
			<h1>404 not found</h1>
			<Link to={'/'}>На главную</Link>
		</div>
	)
}

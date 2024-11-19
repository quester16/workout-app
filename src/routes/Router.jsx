import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotFound } from '../components/pages/not-found/NotFound.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import { routes } from './routes.data.js'

export const Router = () => {
	const { isAuth } = useAuth()

	return (
		<BrowserRouter>
			<Routes>
				{routes.map(route => {
					if (route.isAuth && !isAuth) {
						return false
					}
					return (
						<Route
							path={route.path}
							key={route.path}
							element={<route.element />}
						/>
					)
				})}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

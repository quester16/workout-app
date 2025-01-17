import axios from 'axios'
import Cookies from 'js-cookie'
import { TOKEN } from './app.constans.js'

export const caxios = axios.create({
	baseURL: 'https://wa-backend-xi.vercel.app/api',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${Cookies.get(TOKEN)}`
	}
})

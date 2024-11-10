import withCreate from '../components/hoc/withCreate.jsx'
import { Auth } from '../components/pages/auth/Auth.jsx'
import { NewExercise } from '../components/pages/create exercise/NewExercise.jsx'
import { ExerciseLog } from '../components/pages/exercise-log/ExercieseLog.jsx'
import Home from '../components/pages/home/Home.jsx'
import NewWorkout from '../components/pages/new-workout/NewWorkout.jsx'
import Profile from '../components/pages/profile/Profile.jsx'
import { SingleWorkout } from '../components/pages/workout/single-workout/SingleWorkout.jsx'
import { WorkoutList } from '../components/pages/workout/workout-list/WorkoutList.jsx'

const CreateWorkout = withCreate(NewWorkout, 'workout')
const CreaetNewExercise = withCreate(NewExercise, 'exercise')

export const routes = [
	{
		path: '/auth',
		element: Auth,
		isAuth: false
	},
	{
		path: '/',
		element: Home,
		isAuth: false
	},
	{
		path: '/profile',
		element: Profile,
		isAuth: true
	},
	{
		path: '/new-workout',
		element: CreateWorkout,
		isAuth: true
	},
	{
		path: '/new-exercise',
		element: CreaetNewExercise,
		isAuth: true
	},
	{
		path: '/workouts',
		element: WorkoutList,
		isAuth: true
	},
	{
		path: '/workout/:id',
		element: SingleWorkout,
		isAuth: true
	},
	{
		path: '/exercise/:id',
		element: ExerciseLog,
		isAuth: true
	}
]

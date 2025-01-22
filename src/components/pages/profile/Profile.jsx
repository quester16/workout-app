import Layout from '../../layout/Layout.jsx'
import { Loader } from '../../ui/loader/Loader.jsx'
import styles from './Profile.module.scss'
import { useProfile } from './useProfile.js'

const Profile = () => {
	const { profile, allWorkouts, MremoveWorkout, isLoading } = useProfile()

	const handleDelete = id => {
		MremoveWorkout(id)
		window.location.reload()
	}

	if (isLoading) {
		return <Loader />
	}

	return (
		<Layout>
			<div className={styles.profileContainer}>
				{/* Заголовок профиля */}
				<h1 className={styles.title}>Your Fitness Profile</h1>
				<h3>{profile?.user.email}</h3>

				{/* Информация о пользователе */}
				<div className={styles.profileInfo}>
					<div className={styles.profileStat}>
						<h3>Total Workout Time</h3>
						<p> hours</p>
					</div>
					<div className={styles.profileStat}>
						<h3>Completed Workouts</h3>
						<p>{profile?.totalWorkouts}</p>
					</div>
					<div className={styles.profileStat}>
						<h3>Total Weight Lifted</h3>
						<p>{profile?.totalWeight} kg</p>
					</div>
				</div>

				{/* Фото "До и После" */}
				<div className={styles.workouts}>
					{allWorkouts?.map((workout, i) => {
						return (
							<div key={i} className={styles.workout}>
								<h4>{workout.name}</h4>
								<div
									className={styles.delete}
									onClick={() => handleDelete(workout.id)}
								>
									<img
										src={
											'https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-52-103683.png?f=webp&w=128'
										}
										alt={'delete'}
									/>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</Layout>
	)
}

export default Profile

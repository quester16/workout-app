import Layout from "../../layout/Layout.jsx";
import styles from "./Profile.module.scss";
import { useProfile } from "./useProfile.js";

const Profile = () => {
  const { data } = useProfile();
  const user = {
    totalWorkoutTime: 120, // в часах
    completedWorkouts: 50,
    totalWeightLifted: 10000, // в килограммах
    beforePhoto: "src/assets/react.svg",
    afterPhoto: "src/assets/react.svg",
  };
  const {
    totalWorkoutTime,
    completedWorkouts,
    totalWeightLifted,
    beforePhoto,
    afterPhoto,
  } = user;
  return (
    <Layout>
      <div className={styles.profileContainer}>
        {/* Заголовок профиля */}
        <h1 className={styles.title}>Your Fitness Profile</h1>
        <h3>{data?.data && data?.data?.name}</h3>

        {/* Информация о пользователе */}
        <div className={styles.profileInfo}>
          <div className={styles.profileStat}>
            <h3>Total Workout Time</h3>
            <p>{totalWorkoutTime} hours</p>
          </div>
          <div className={styles.profileStat}>
            <h3>Completed Workouts</h3>
            <p>{completedWorkouts}</p>
          </div>
          <div className={styles.profileStat}>
            <h3>Total Weight Lifted</h3>
            <p>{totalWeightLifted} kg</p>
          </div>
        </div>

        {/* Фото "До и После" */}
        <div className={styles.profilePhotos}>
          <div className={styles.photoBlock}>
            <h3>Before</h3>
            <img
              src={beforePhoto}
              alt="Before"
              className={styles.profilePhoto}
            />
          </div>
          <div className={styles.photoBlock}>
            <h3>After</h3>
            <img src={afterPhoto} alt="After" className={styles.profilePhoto} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

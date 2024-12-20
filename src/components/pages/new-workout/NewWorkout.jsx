import style from '../../pages/profile/Profile.module.scss'

export const NewWorkout = ({ content }) => {
  return (
    <>
      <h1 className={style.title}>Создать новую тренировку</h1>
      {content}
    </>
  );
};

export default NewWorkout;

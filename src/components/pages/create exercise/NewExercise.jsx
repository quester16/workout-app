import style from '../../pages/profile/Profile.module.scss'

export const NewExercise = ({ content }) => {
  return (
    <>
      <h1 className={style.title}>Создать новое упражнение</h1>
      {content}
    </>
  );
};

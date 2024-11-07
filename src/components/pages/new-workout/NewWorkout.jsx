import style from "../../pages/profile/Profile.module.scss";

export const NewWorkout = ({ content }) => {
  return (
    <>
      <h1 className={style.title}>Create new workout</h1>
      {content}
    </>
  );
};

export default NewWorkout;

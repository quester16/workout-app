import style from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={style.loader}>
      <img src="/loader.gif" alt={"loader"} />
    </div>
  );
};

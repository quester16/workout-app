import cn from "clsx";
import style from "./Button.module.scss";

// eslint-disable-next-line react/prop-types
export const Button = ({ children, handleClick, type }) => {
  return (
    <div className={style.wrapper}>
      <button className={cn(style.btn, style[type])} onClick={handleClick}>
        {children}
      </button>
    </div>
  );
};

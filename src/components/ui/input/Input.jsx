import style from './Input.module.scss'
// eslint-disable-next-line react/prop-types
export const Input = ({ register , options, name, errors, ...props }) => {
  return (
    <div className={style.container}>
      <div className="errors">{errors && <div>{errors}</div> }</div>
      <input
        { ...register(name, { ...options }) }
        className={style.styled_input}
        {...props}
      />
    </div>
  );
};

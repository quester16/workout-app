import { MdArrowBack } from "react-icons/md";
import { Button } from "../../ui/button/Button.jsx";
import { Input } from "../../ui/input/Input.jsx";
import { Loader } from "../../ui/loader/Loader.jsx";
import style from "./Auth.module.scss";
import { useAuthPage } from "./useAuthPage.js";

export const Auth = () => {
  const {
    isPending,
    errors,
    handleAuth,
    handleSubmit,
    navigate,
    register,
    setType,
  } = useAuthPage();

  return (
    <>
      <button className={style.back} onClick={() => navigate("/")}>
        <MdArrowBack style={{ fontSize: "2rem" }} />
      </button>
      <h1 className={style.heading}>Войти в систему</h1>
      <form className={style.form} onSubmit={handleSubmit(handleAuth)}>
        <div className={style.loader} style={{ opacity: isPending ? 1 : 0 }}>
          <Loader />
        </div>

        <Input
          register={register}
          errors={errors?.email?.message}
          options={{
            required: "Введите почту",
          }}
          name={"email"}
          label={"Email"}
          type={"email"}
          placeholder={"Email"}
        />
        <Input
          register={register}
          errors={errors?.password?.message}
          options={{
            required: "Введите пароль",
          }}
          name={"password"}
          label={"Password"}
          type={"password"}
          placeholder={"Password"}
        />
        <div className={style.btns}>
          <Button type={"primary"} handleClick={() => setType("register")}>
            Регистрация
          </Button>
          <Button type={"secondary"} handleClick={() => setType("login")}>
            Войти
          </Button>
        </div>
      </form>
    </>
  );
};

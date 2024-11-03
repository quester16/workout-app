import Layout from "../layout/Layout.jsx";
import { Button } from "../ui/button/Button.jsx";
import { Input } from "../ui/input/Input.jsx";
import { ReactSelect } from "../ui/select/Select.jsx";
import { useWithCreate } from "./useWithCreate.js";
import style from "./withCreate.module.scss";

const withCreate = (WrappedComponent, type) => {
  // eslint-disable-next-line react/display-name
  return function () {
    const { createExercise, errors, handleSubmit, register, control } =
      useWithCreate(type);

    const toRender = () => {
      return (
        <div className={style.profileContainer}>
          <form className={style.form} onSubmit={handleSubmit(createExercise)}>
            <Input
              register={register}
              errors={errors?.name?.message}
              options={{
                required: "Введите название",
              }}
              name={"name"}
              type={"name"}
              placeholder={"name"}
            />

            {type === "workout" ? (
              <ReactSelect control={control} isMulti={true} />
            ) : (
              <>
                <Input
                  register={register}
                  errors={errors?.sets?.message}
                  options={{
                    valueAsNumber: true,
                    validate: (value) => value > 0 || "Sets must be a number.",
                    required: "Введите количество потходов",
                  }}
                  name={"sets"}
                  type={"number"}
                  placeholder={"Times"}
                />
                <ReactSelect control={control} isMulti={false} />
              </>
            )}

            <div className={style.btns}>
              <Button type={"primary"} handleClick={() => {}}>
                Создать
              </Button>
            </div>
          </form>
        </div>
      );
    };

    const content = toRender();
    return (
      <Layout>
        <WrappedComponent content={content} />
      </Layout>
    );
  };
};

export default withCreate;

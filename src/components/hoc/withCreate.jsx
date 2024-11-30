import { Link } from 'react-router-dom'
import Layout from '../layout/Layout.jsx'
import { Notification } from '../notification/Notification.jsx'
import { Button } from '../ui/button/Button.jsx'
import { Input } from '../ui/input/Input.jsx'
import { ReactSelect } from '../ui/select/Select.jsx'
import { useWithCreate } from './useWithCreate.js'
import style from './withCreate.module.scss'

const withCreate = (WrappedComponent, type) => {
	// eslint-disable-next-line react/display-name
	return function () {
		const {
			createExercise,
			errors,
			handleSubmit,
			register,
			control,
			onError,
			isSuccess
		} = useWithCreate(type)
		console.log(isSuccess)
		const toRender = () => {
			return (
				<div className={style.profileContainer}>
					{onError && (
						<Notification
							message={'Не удалось добавить повторите после перезагрузки!'}
							success={false}
						/>
					)}
					{isSuccess && (
						<Notification message={'Успешно добавлено!'} success={true} />
					)}
					<form className={style.form} onSubmit={handleSubmit(createExercise)}>
						<Input
							register={register}
							errors={errors?.name?.message}
							options={{
								required: 'Введите название'
							}}
							name={'name'}
							type={'name'}
							placeholder={'name'}
						/>

						{type === 'workout' ? (
							<>
								<Link to={'/new-exercise'} className={style.link}>
									Создать упражнение
								</Link>
								<ReactSelect control={control} isMulti={true} />
							</>
						) : (
							<>
								<Input
									register={register}
									errors={errors?.sets?.message}
									options={{
										valueAsNumber: true,
										validate: value => value > 0 || 'Sets must be a number.',
										required: 'Введите количество потходов'
									}}
									name={'sets'}
									type={'number'}
									placeholder={'Times'}
								/>
								<ReactSelect control={control} isMulti={false} />
							</>
						)}

						<div className={style.btns}>
							<Button type={'primary'} handleClick={() => {}}>
								Создать
							</Button>
						</div>
					</form>
				</div>
			)
		}

		const content = toRender()
		return (
			<Layout>
				<WrappedComponent content={content} />
			</Layout>
		)
	}
}

export default withCreate

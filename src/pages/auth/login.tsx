import type {NextPage,} from 'next'
import Head from 'next/head'
import AuthLayout, {AuthLoader, ErrorMessage,} from '../../layout/AuthLayout'
import Input from '../../components/UI/Input'
import React from 'react'
import {useForm,} from 'react-hook-form'
import {yupResolver,} from '@hookform/resolvers/yup'
import {LoginFormSchema,} from '../../utils/validation'
import {useRouter,} from 'next/router'
import {useAppDispatch,} from '../../store/hooks'
import {Routes,} from '../../constants/routes'
import MailIcon from '../../../public/assets/icons/mail.svg'
import PasswordIcon from '../../../public/assets/icons/password.svg'
import Button from '../../components/UI/Button'
import {Api, isAxiosError,} from '../../services'
import {setUserAuth,} from '../../store/reducers/auth'
import {setCookie,} from 'nookies'
import {SOMETHING_WENT_WRONG,} from '../../constants/api'
import {LoginUserDto,} from '../../services/auth/dto'

const Login: NextPage = () => {
	return (
		<div>
			<Head>
				<title>LogIn | FeedBack</title>
				<meta name="description" content="Page of login"/>
			</Head>

			<AuthLayout title="Sign In" link={{
				path: Routes.REGISTER,
				linkText: 'Register here',
				text: 'Want to create an account?',
			}}>
				<LoginForm/>
			</AuthLayout>
		</div>
	)
}

type IFormInputs = LoginUserDto

const LoginForm = () => {
	const {push,} = useRouter()
	const dispatch = useAppDispatch()
	const {
		register,
		handleSubmit,
		formState: {errors, isValid, isSubmitting,},
		reset,
	} = useForm<IFormInputs>({mode: 'onChange', resolver: yupResolver(LoginFormSchema),})
	const [loading, setLoading,] = React.useState(false)
	const [error, setError,] = React.useState<string | string[]>('')

	const onSubmit = async (dto: IFormInputs) => {
		setLoading(true)
		try {

			const {data,} = await Api().auth.login(dto)

			await dispatch(setUserAuth(data))

			if ('access_token' in data) {
				setCookie(null, 'feedBackAuthToken', data.access_token, {
					maxAge: 30 * 24 * 60 * 60,
					path: '/',
				})
			}

			if (data.verify === false) {
				await push(Routes.VERIFY)
				return
			}

			await push(Routes.HOME)
		} catch (err) {
			let error
			if (isAxiosError(err)) {
				error = err.response?.data?.message || SOMETHING_WENT_WRONG
			} else {
				error = SOMETHING_WENT_WRONG
			}
			setError(error)
		}

		setLoading(false)
		reset()
	}

	if (loading) {
		return <AuthLoader/>
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mt-3.5">
				<Input Icon={MailIcon}
					   placeholder="E-mail"
					   type="email"
					   alt="email icon"
					   error={!!errors.email?.message}
					   {...register('email')}/>
			</div>
			<div className="mt-3.5">
				<Input Icon={PasswordIcon}
					   placeholder="Password"
					   type="password"
					   alt="password icon"
					   error={!!errors.password?.message}
					   {...register('password')}/>
			</div>
			<div className="mt-3.5 text-center">
				<Button type="submit" disabled={!isValid || isSubmitting}>Sign In</Button>
			</div>
			{!!error && (
				<div className="mt-3.5">
					<ErrorMessage message={error}/>
				</div>
			)}
		</form>
	)
}

export default Login

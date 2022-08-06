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
import {setUserAuth,} from '../../store/reducers/auth'
import {Routes,} from '../../constants/routes'
import {LoginUserDto,} from '../../store/services/types.dto'
import MailIcon from '../../../public/assets/icons/mail.svg'
import PasswordIcon from '../../../public/assets/icons/password.svg'
import {AuthAPI,} from '../../store/services/AuthService'
import Button from '../../components/UI/Button'
import {ResponseError,} from '../../store/services/types'
import {setCookie,} from 'nookies'

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
	const {register, handleSubmit, formState: {errors, isValid, isSubmitting,}, reset,} = useForm<IFormInputs>({
		mode: 'onChange',
		resolver: yupResolver(LoginFormSchema),
	})
	const [login, {error, isLoading, isError,},] = AuthAPI.useLoginMutation()

	const errorMessage = (error as ResponseError)?.data?.message

	const onSubmit = async (dto: IFormInputs) => {
		await login(dto).unwrap().then(async (user) => {
			dispatch(setUserAuth(user))

			if ('access_token' in user) {
				setCookie(null, 'feedBackAuthToken', user.access_token, {
					maxAge: 30 * 24 * 60 * 60,
					path: '/',
				})
			}

			if (user.verify === false) {
				await push(Routes.VERIFY)
				return
			}

			await push(Routes.HOME)
		}).catch(() => {
			reset()
		})
	}

	if (isLoading) {
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
			{isError && (
				<div className="mt-3.5">
					<ErrorMessage message={errorMessage}/>
				</div>
			)}
		</form>
	)
}

export default Login

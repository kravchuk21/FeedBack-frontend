import type {NextPage,} from 'next'
import Head from 'next/head'
import AuthLayout from '../../layout/AuthLayout'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import React from 'react'
import {useForm,} from 'react-hook-form'
import {yupResolver,} from '@hookform/resolvers/yup'
import {LoginFormSchema,} from '../../utils/validation'
import {LoginResponse, ResponseError,} from '../api/types.response'
import {useRouter,} from 'next/router'
import {useAppDispatch,} from '../../store/hooks'
import {fetchLogin,} from '../../store/slices/auth'
import {Routes,} from '../../constants/routes'
import {LoginUserDto,} from '../api/types.dto'

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
		mode: 'onBlur',
		resolver: yupResolver(LoginFormSchema),
	})

	const onSubmit = async (dto: IFormInputs) => {
		dispatch(fetchLogin(dto)).then(async ({payload,}) => {
			if ((payload as ResponseError)?.error !== undefined) {
				reset()
			} else if ((payload as LoginResponse)?.verify === true) {
				await push(Routes.HOME)
			} else if ((payload as LoginResponse)?.verify === false) {
				await push(Routes.VERIFY)
			} else {
				reset()
			}
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mt-3.5">
				<Input icon="/assets/icons/mail.svg"
					   placeholder="E-mail"
					   type="email"
					   error={!!errors.email?.message}
					   {...register('email')}/>
			</div>
			<div className="mt-3.5">
				<Input icon="/assets/icons/password.svg"
					   placeholder="Password"
					   type="password"
					   error={!!errors.password?.message}
					   {...register('password')}/>
			</div>
			<div className="mt-3.5">
				<Button type="submit" disabled={!isValid || isSubmitting}>Sign In</Button>
			</div>
		</form>
	)
}

export default Login

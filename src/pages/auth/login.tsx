import type {NextPage,} from 'next'
import Head from 'next/head'
import AuthLayout from '../../layout/AuthLayout'
import Button from '../../components/UI/Button'
import Input from '../../components/Input'
import PasswordInput from '../../components/PasswordInput'
import styles from '../../styles/Auth.module.css'
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
import IconButton from '../../components/UI/IconButton'

type IFormInputs = LoginUserDto

const Login: NextPage = () => {
	const {push,} = useRouter()
	const dispatch = useAppDispatch()
	const {register, handleSubmit, formState: {errors, isValid, isSubmitting,}, reset,} = useForm<IFormInputs>({
		mode: 'onChange',
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
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input className={styles.input}
						   icon="/assets/icons/mail.svg"
						   placeholder="E-mail"
						   type="email"
						   error={!!errors.email?.message}
						   {...register('email')}/>
					<PasswordInput className={styles.input}
								   placeholder="Password"
								   error={!!errors.password?.message}
								   {...register('password')}/>
					<Button type="submit" disabled={!isValid || isSubmitting}>Sign In</Button>
					<Button type="submit">Sign In</Button>
					<IconButton iconPath="/assets/icons/eye.svg" alt="Watch Password"/>
				</form>
			</AuthLayout>
		</div>
	)
}

export default Login

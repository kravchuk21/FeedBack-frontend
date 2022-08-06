import type {NextPage,} from 'next'
import Head from 'next/head'
import AuthLayout, {AuthLoader, ErrorMessage,} from '../../layout/AuthLayout'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import {yupResolver,} from '@hookform/resolvers/yup'
import {RegisterFormSchema,} from '../../utils/validation'
import {useForm,} from 'react-hook-form'
import React from 'react'
import {useRouter,} from 'next/router'
import {Routes,} from '../../constants/routes'
import {CreateUserDto,} from '../../store/services/types.dto'
import PersonIcon from '../../../public/assets/icons/person.svg'
import MailIcon from '../../../public/assets/icons/mail.svg'
import PasswordIcon from '../../../public/assets/icons/password.svg'
import {AuthAPI,} from '../../store/services/AuthService'
import {ResponseError,} from '../../store/services/types'

const Register: NextPage = () => (
	<div>
		<Head>
			<title>Register | FeedBack</title>
			<meta name="description" content="Page of registration"/>
		</Head>

		<AuthLayout title="Sign Up" link={{
			path: Routes.LOGIN,
			text: 'Login here',
			linkText: 'Do you have a account?',
		}}>
			<RegisterForm/>
		</AuthLayout>
	</div>
)

type IFormInputs = CreateUserDto

const RegisterForm = () => {
	const {push,} = useRouter()
	const [fetchRegister, {error, isLoading, isError,},] = AuthAPI.useRegisterMutation()

	const {register, handleSubmit, formState: {errors, isSubmitting, isValid,}, reset,} = useForm<IFormInputs>({
		mode: 'onChange',
		resolver: yupResolver(RegisterFormSchema),
	})

	const errorMessage = (error as ResponseError)?.data.message

	const onSubmit = async (dto: IFormInputs) => {
		await fetchRegister(dto).unwrap().then(async () => {
			await push(Routes.LOGIN)
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
				<Input Icon={PersonIcon}
					   placeholder="Full name"
					   error={!!errors.fullName?.message}
					   {...register('fullName')}/>
			</div>
			<div className="mt-3.5">
				<Input Icon={MailIcon}
					   placeholder="E-mail"
					   type="email"
					   error={!!errors.email?.message}
					   {...register('email')}/>
			</div>
			<div className="mt-3.5">
				<Input placeholder="Password"
					   type="password"
					   Icon={PasswordIcon}
					   error={!!errors.password?.message}
					   {...register('password')}/>
			</div>
			<div className="mt-3.5">
				<Button type="submit"
						disabled={!isValid || isSubmitting}
				>Sign Up</Button>
			</div>
			{isError && (
				<div className="mt-3.5">
					<ErrorMessage message={errorMessage}/>
				</div>
			)}
		</form>
	)
}

export default Register

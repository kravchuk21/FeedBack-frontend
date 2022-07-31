import type {NextPage,} from 'next'
import Head from 'next/head'
import AuthLayout from '../../layout/AuthLayout'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import {yupResolver,} from '@hookform/resolvers/yup'
import {RegisterFormSchema,} from '../../utils/validation'
import {useForm,} from 'react-hook-form'
import React from 'react'
import {ResponseError,} from '../api/types.response'
import {useRouter,} from 'next/router'
import {useAppDispatch,} from '../../store/hooks'
import {fetchRegister,} from '../../store/slices/auth'
import {Routes,} from '../../constants/routes'
import {CreateUserDto,} from '../api/types.dto'
import PersonIcon from '../../../public/assets/icons/person.svg'
import MailIcon from '../../../public/assets/icons/mail.svg'
import PasswordIcon from '../../../public/assets/icons/password.svg'

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
	const dispatch = useAppDispatch()

	const {register, handleSubmit, formState: {errors, isSubmitting, isValid,}, reset,} = useForm<IFormInputs>({
		mode: 'onChange',
		resolver: yupResolver(RegisterFormSchema),
	})


	const onSubmit = async (dto: IFormInputs) => {
		dispatch(fetchRegister(dto)).then(async ({payload,}) => {
			if ((payload as ResponseError)?.error === undefined) {
				await push(Routes.LOGIN)
			} else {
				reset()
			}
		})
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
		</form>
	)
}

export default Register

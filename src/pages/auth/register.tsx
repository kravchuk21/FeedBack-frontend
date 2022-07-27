import type {NextPage,} from 'next'
import Head from 'next/head'
import AuthLayout from '../../layout/AuthLayout'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import PasswordInput from '../../components/PasswordInput'
import styles from '../../styles/Auth.module.css'
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

type IFormInputs = CreateUserDto

const Register: NextPage = () => {
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
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input className={styles.input}
						   icon="/assets/icons/person.svg"
						   placeholder="Full name"
						   error={!!errors.fullName?.message}
						   {...register('fullName')}/>
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
					<Button type="submit"
							disabled={!isValid || isSubmitting}
					>Sign Up</Button>
				</form>
			</AuthLayout>
		</div>
	)
}

export default Register

import type {NextPage} from 'next';
import Head from 'next/head';
import AuthLayout from '../../layout/AuthLayout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import styles from '../../styles/Auth.module.css';
import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoginFormSchema} from '../../utils/validation';
import {LoginResponse, LoginUserDto, ResponseError} from '../api/types';
import {useRouter} from 'next/router';
import {useAppDispatch} from '../../store/hooks';
import {fetchLogin} from '../../store/slices/auth';
import {Routes} from '../../constants/routes';

interface IFormInputs extends LoginUserDto {
}

const Login: NextPage = () => {
	const {push} = useRouter();
	const dispatch = useAppDispatch();
	const {register, handleSubmit, formState, reset} = useForm<IFormInputs>({
		mode: 'onChange',
		resolver: yupResolver(LoginFormSchema),
	});

	const onSubmit = async (dto: IFormInputs) => {
		dispatch(fetchLogin(dto)).then(async ({payload}) => {
			if ((payload as ResponseError)?.error !== undefined) {
				reset();
			} else if ((payload as LoginResponse)?.verify === true) {
				await push(Routes.HOME);
			} else if ((payload as LoginResponse)?.verify === false) {
				await push(Routes.VERIFY);
			} else {
				reset();
			}
		});
	};

	return (
		<div>
			<Head>
				<title>LogIn | FeedBack</title>
				<meta name="description" content="Page of login"/>
			</Head>

			<AuthLayout title="Sign In" link={{
				path: Routes.REGISTER,
				linkText: 'Register here',
				text: 'Want to create an account?'
			}}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input className={styles.input}
						   icon="/assets/input_icons/mail.svg"
						   placeholder="E-mail"
						   type="email"
						   {...register('email')}/>
					<PasswordInput className={styles.input}
								   placeholder="Password"
								   {...register('password')}/>
					<Button type="submit"
							disabled={!formState.isValid || formState.isSubmitting}
							text="Sign In"
					/>
				</form>
			</AuthLayout>
		</div>
	);
};

export default Login;

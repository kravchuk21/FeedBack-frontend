import type {NextPage,} from 'next'
import Head from 'next/head'
import AuthLayout from '../../layout/AuthLayout'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import React from 'react'
import styles from '../../styles/Auth.module.css'
import {useRouter,} from 'next/router'
import {useForm,} from 'react-hook-form'
import {yupResolver,} from '@hookform/resolvers/yup'
import {VerifyFormSchema,} from '../../utils/validation'
import {ResponseError,} from '../api/types.response'
import {fetchGetNewVerify, fetchVerify, selectUserEmail,} from '../../store/slices/auth'
import {useAppDispatch, useAppSelector,} from '../../store/hooks'
import {Routes,} from '../../constants/routes'

interface IFormInputs {
	verificationCode: string;
}


const Verify: NextPage = () => {
	const {push,} = useRouter()
	const {register, handleSubmit, formState: {errors, isSubmitting, isValid,}, reset,} = useForm<IFormInputs>({
		mode: 'onChange',
		resolver: yupResolver(VerifyFormSchema),
	})
	const dispatch = useAppDispatch()
	const email = useAppSelector(selectUserEmail)

	React.useEffect(() => {
		if (!email) {
			push(Routes.LOGIN).then(() => null)
		}
	}, [email, push,])

	const onSubmit = async (dto: IFormInputs) => {
		if (email) {
			dispatch(fetchVerify({email, verificationCode: dto.verificationCode,})).then(async ({payload,}) => {
				if ((payload as ResponseError)?.error === undefined) {
					await push(Routes.HOME)
				} else {
					reset()
				}
			})
		}
	}

	const onGetNewVerificationCode = async () => {
		if (email) {
			dispatch(fetchGetNewVerify({email,})).then(() => {
				reset()
			})
		}
	}

	return (
		<div>
			<Head>
				<title>Verify | FeedBack</title>
				<meta name="description" content="Page of verification"/>
			</Head>

			<AuthLayout title="Verify" link={{
				path: Routes.REGISTER,
				linkText: 'Login here',
				text: 'Want to create an account?',
			}}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input className={styles.input} placeholder="Enter 4-symbol code" maxLength={4} type="tel"
						   icon="/assets/icons/key.svg"
						   error={!!errors.verificationCode?.message}
						   {...register('verificationCode')}/>
					<Button type="submit"
							disabled={!isValid || isSubmitting}>Confirm</Button>
					<Button onClick={onGetNewVerificationCode}>Get a new code</Button>
				</form>
			</AuthLayout>
		</div>
	)
}

export default Verify

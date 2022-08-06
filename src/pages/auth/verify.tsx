import type {NextPage,} from 'next'
import Head from 'next/head'
import AuthLayout, {AuthLoader, ErrorMessage,} from '../../layout/AuthLayout'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import React from 'react'
import {useRouter,} from 'next/router'
import {useForm,} from 'react-hook-form'
import {yupResolver,} from '@hookform/resolvers/yup'
import {VerifyFormSchema,} from '../../utils/validation'
import {selectUserEmail, setUserVerify,} from '../../store/reducers/auth'
import {useAppDispatch, useAppSelector,} from '../../store/hooks'
import {Routes,} from '../../constants/routes'
import CodeIcon from '../../../public/assets/icons/key.svg'
import {AuthAPI,} from '../../store/services/AuthService'
import { ResponseError, } from '../../store/services/types'

const Verify: NextPage = () => (
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
			<VerifyForm/>
		</AuthLayout>
	</div>
)


interface IFormInputs {
	verificationCode: string;
}

const VerifyForm = () => {
	const {push,} = useRouter()
	const {register, handleSubmit, formState: {errors, isSubmitting, isValid,}, reset,} = useForm<IFormInputs>({
		mode: 'onChange',
		resolver: yupResolver(VerifyFormSchema),
	})
	const dispatch = useAppDispatch()
	const email = useAppSelector(selectUserEmail)
	const [verify,] = AuthAPI.useVerifyMutation()
	const [getVerifyCode, {isLoading, error, isError,},] = AuthAPI.useGetVerifyCodeMutation()

	React.useEffect(() => {
		if (!email) {
			push(Routes.LOGIN).then(() => null)
		}
	}, [email, push,])

	const errorMessage = (error as ResponseError)?.data.message

	const onSubmit = async (dto: IFormInputs) => {
		if (email) {
			await verify({email, verificationCode: dto.verificationCode,}).unwrap().then(async () => {
				dispatch(setUserVerify(true))
				await push(Routes.HOME)
			}).catch(() => {
				reset()
			})
		}
	}

	const onGetNewVerificationCode = async () => {
		if (email) {
			await getVerifyCode({email,}).unwrap()
			reset()
		}
	}

	if (isLoading) {
		return <AuthLoader/>
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mt-3.5">
				<Input placeholder="Enter 4-symbol code" maxLength={4} type="tel"
					   Icon={CodeIcon}
					   error={!!errors.verificationCode?.message}
					   {...register('verificationCode')}/>
			</div>
			<div className="mt-3.5">
				<Button type="submit"
						disabled={!isValid || isSubmitting}>Confirm</Button>
			</div>
			<div className="mt-3.5">
				<Button onClick={onGetNewVerificationCode}>Get a new code</Button>
			</div>
			{isError && (
				<div className="mt-3.5">
					<ErrorMessage message={errorMessage}/>
				</div>
			)}
		</form>
	)
}

export default Verify

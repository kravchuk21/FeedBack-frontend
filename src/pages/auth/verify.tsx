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
import {Api, isAxiosError,} from '../../services'
import {SOMETHING_WENT_WRONG,} from '../../constants/api'

const Verify: NextPage = () => (
	<div>
		<Head>
			<title>Verify | FeedBack</title>
			<meta name="description" content="Page of verification"/>
		</Head>

		<AuthLayout title="Verify" link={{
			path: Routes.REGISTER,
			linkText: 'Login here',
			text: 'Do you have a account?',
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
	const dispatch = useAppDispatch()
	const {
		register,
		handleSubmit,
		formState: {errors, isSubmitting, isValid,},
		reset,
	} = useForm<IFormInputs>({mode: 'onChange', resolver: yupResolver(VerifyFormSchema),})
	const email = useAppSelector(selectUserEmail)
	const [loading, setLoading,] = React.useState(false)
	const [error, setError,] = React.useState<string | string[]>('')


	React.useEffect(() => {
		if (!email) {
			push(Routes.LOGIN).then(() => null)
		}
	}, [email, push,])

	const onSubmit = async (dto: IFormInputs) => {
		setLoading(true)
		if (email) {
			try {
				await Api().auth.verify({email, ...dto,})
				await dispatch(setUserVerify(true))
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
		}

		setLoading(false)
		reset()
	}
	const onGetNewVerificationCode = async () => {
		setLoading(true)
		if (email) {
			try {
				await Api().auth.getNewVerificationCode({email,})
			} catch (err) {
				let error
				if (isAxiosError(err)) {
					error = err.response?.data?.message || SOMETHING_WENT_WRONG
				} else {
					error = SOMETHING_WENT_WRONG
				}
				setError(error)
			}
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
			{!!error && (
				<div className="mt-3.5">
					<ErrorMessage message={error}/>
				</div>
			)}
		</form>
	)
}

export default Verify

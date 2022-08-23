import axios, {AxiosError,} from 'axios'
import {GetServerSidePropsContext, NextPageContext,} from 'next'
import Cookies, {parseCookies,} from 'nookies'
import {AuthApi,} from './auth'
import {UserApi,} from './user'
import {ResponseError,} from './types'
import {DialogsApi,} from './dialogs'
import {DialogApi,} from './dialog'

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7777/api/'

export function isAxiosError<ResponseType = ResponseError>(error: unknown): error is AxiosError<ResponseType> {
	return axios.isAxiosError(error)
}

export type ApiReturnType = {
	user: ReturnType<typeof UserApi>;
	auth: ReturnType<typeof AuthApi>;
	dialogs: ReturnType<typeof DialogsApi>;
	dialog: ReturnType<typeof DialogApi>;
};

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
	const cookies = ctx ? Cookies.get(ctx) : parseCookies()
	const token = cookies.feedBackAuthToken

	const instance = axios.create({
		baseURL,
		headers: {
			Authorization: 'Bearer ' + token,
		},
	})

	const apis = {
		user: UserApi,
		auth: AuthApi,
		dialogs: DialogsApi,
		dialog: DialogApi,
	}

	return Object.entries(apis).reduce((prev, [key, f,]) => {
		return {
			...prev,
			[key]: f(instance),
		}
	}, {} as ApiReturnType)
}

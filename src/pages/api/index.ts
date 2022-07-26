import axios from 'axios';
import {GetServerSidePropsContext, NextPageContext} from 'next';
import Cookies, {parseCookies} from 'nookies';
import {UserApi} from './user';

export type ApiReturnType = {
	user: ReturnType<typeof UserApi>;
};

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
	const cookies = ctx ? Cookies.get(ctx) : parseCookies();
	const token = cookies.feedBackAuthToken;

	const instance = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7777/api/',
		headers: {
			Authorization: 'Bearer ' + token
		},
	});

	const apis = {
		user: UserApi,
	};

	return Object.entries(apis).reduce((prev, [key, f]) => {
		return {
			...prev,
			[key]: f(instance),
		};
	}, {} as ApiReturnType);
};


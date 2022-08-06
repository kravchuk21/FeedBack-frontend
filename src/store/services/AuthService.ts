import {createApi, fetchBaseQuery,} from '@reduxjs/toolkit/dist/query/react'
import {CreateUserDto, LoginUserDto, VerifyUserDto,} from './types.dto'
import {Empty,} from '../types'
import {UserInterface,} from '../../interfaces/user.interface'
import {baseUrl,} from './index'


export type LoginResponse = {
	email: string;
	verify: boolean;
	access_token: string;
}

export const AuthAPI = createApi({
	reducerPath: 'authAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl + 'auth',
	}),
	endpoints: (build) => ({
		login: build.mutation<LoginResponse, LoginUserDto>({
			query: (dto) => ({
				url: '/login',
				method: 'POST',
				body: dto,
			}),

		}),
		register: build.mutation<Empty, CreateUserDto>({
			query: (dto) => ({
				url: '/register',
				method: 'POST',
				body: dto,
			}),
		}),
		verify: build.mutation<Empty, VerifyUserDto>({
			query: (dto) => ({
				url: '/verify',
				method: 'POST',
				body: dto,
			}),
		}),
		getVerifyCode: build.mutation<Empty, Pick<UserInterface, 'email'>>({
			query: (dto) => ({
				url: '/getNewVerificationCode',
				method: 'POST',
				body: dto,
			}),
		}),
	}),
})

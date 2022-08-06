import {createApi, fetchBaseQuery,} from '@reduxjs/toolkit/dist/query/react'
import {HYDRATE,} from 'next-redux-wrapper'
import {UserInterface,} from '../../interfaces/user.interface'
import {baseUrl, prepareHeadersAuthorization,} from './index'

const baseQuery = fetchBaseQuery({
	baseUrl: baseUrl + 'user',
	prepareHeaders: prepareHeadersAuthorization,
	credentials: 'include',
})

export const UserAPI = createApi({
	reducerPath: 'userAPI',
	baseQuery: baseQuery,
	extractRehydrationInfo(action, {reducerPath,}) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath]
		}
	},
	endpoints: (build) => ({
		me: build.query<UserInterface, void>({
			query: () => ({
				url: '/me',
				method: 'GET',
			}),
		}),
		search: build.mutation<UserInterface[], string>({
			query: (search) => ({
				url: '/search/' + search,
				method: 'GET',
			}),
		}),
		getUserById: build.query<UserInterface, string>({
			query: (id) => ({
				url: '/getById/' + id,
				method: 'GET',
			}),
		}),
	}),
})

export const {me, getUserById,} = UserAPI.endpoints

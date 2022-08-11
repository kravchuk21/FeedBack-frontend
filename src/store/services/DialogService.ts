import {createApi, fetchBaseQuery,} from '@reduxjs/toolkit/dist/query/react'
import {baseUrl, prepareHeadersAuthorization,} from './index'
import {DialogInterface,} from '../../interfaces/dialog.interface'
import {HYDRATE,} from 'next-redux-wrapper'
import {UserInterface,} from '../../interfaces/user.interface'

const baseQuery = fetchBaseQuery({
	baseUrl: baseUrl + 'dialog',
	prepareHeaders: prepareHeadersAuthorization,
	credentials: 'include',
})


export const DialogAPI = createApi({
	reducerPath: 'dialogAPI',
	baseQuery: baseQuery,
	tagTypes: ['Dialogs',],
	extractRehydrationInfo(action, {reducerPath,}) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath]
		}
	},
	endpoints: (build) => ({
		getAllUserDialogs: build.query<DialogInterface[], void>({
			query: () => ({
				url: '/',
			}),
		}),
		getMate: build.mutation<UserInterface, string>({
			query: (dialogId) => ({
				url: '/' + dialogId,
			}),
		}),
	}),
})

export const {getAllUserDialogs,} = DialogAPI.endpoints

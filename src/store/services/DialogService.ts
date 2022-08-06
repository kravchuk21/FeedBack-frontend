import {createApi, fetchBaseQuery,} from '@reduxjs/toolkit/dist/query/react'
import {baseUrl, prepareHeadersAuthorization,} from './index'
import {DialogInterface,} from '../../interfaces/dialog.interface'
import {HYDRATE,} from 'next-redux-wrapper'

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
	}),
})

export const {util: {getRunningOperationPromises,},} = DialogAPI

export const {getAllUserDialogs,} = DialogAPI.endpoints

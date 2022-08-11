import {createApi, fetchBaseQuery,} from '@reduxjs/toolkit/dist/query/react'
import {baseUrl, prepareHeadersAuthorization,} from './index'
import {MessageInterface,} from '../../interfaces/messsge.interfaxe'

const baseQuery = fetchBaseQuery({
	baseUrl: baseUrl + 'message',
	prepareHeaders: prepareHeadersAuthorization,
	credentials: 'include',
})


export const MessagesAPI = createApi({
	reducerPath: 'messagesAPI',
	baseQuery: baseQuery,
	tagTypes: ['Messages',],
	endpoints: (build) => ({
		getAllDialogMessages: build.mutation<MessageInterface[], string>({
			query: (dialogId) => ({
				url: '/' + dialogId,
				method: 'GET',
			}),
		}),
	}),
})


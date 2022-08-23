import {io,} from 'socket.io-client'
import {getCookie,} from 'cookies-next'


export const socket = io('http://localhost:7777', {
	extraHeaders: {
		'Authorization': 'Bearer ' + getCookie('feedBackAuthToken'),
	},
})


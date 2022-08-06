import Cookies, {parseCookies,} from 'nookies'

export const baseUrl: string = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7777/api/')

export const prepareHeadersAuthorization = (headers: Headers, {extra,}: any) => {
	if (extra) {
		const cookies = extra.ctx?.req.cookies || Cookies.get(extra.ctx) || parseCookies()

		if (cookies) {
			const token = cookies.feedBackAuthToken

			if (token) {
				headers.set('Authorization', 'Bearer ' + token)
			}
		}
	}
	return headers
}

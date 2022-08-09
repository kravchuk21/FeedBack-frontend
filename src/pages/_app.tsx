import '../styles/variables.css'
import '../styles/globals.css'
import {wrapper,} from '../store/store'
import React from 'react'
import {AppProps,} from 'next/app'
import {setUserData,} from '../store/reducers/user'
import {ThemeProvider,} from 'next-themes'
import {Routes,} from '../constants/routes'
import {UIProvider,} from '../components/UI'
import {Theme,} from '../../theme'
import {me,} from '../store/services/UserService'

const App = ({Component, pageProps,}: AppProps) => (
	<ThemeProvider defaultTheme="system" themes={['dark', 'light',]}>
		<UIProvider value={Theme}>
			<div className="container">
				<Component {...pageProps} />
			</div>
		</UIProvider>
	</ThemeProvider>
)

const forbiddenPaths = [
	Routes.AUTH,
]

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ctx, Component,}) => {
	const {data: user,} = await store.dispatch(me.initiate())

	const route = '/' + ctx.asPath?.substr(1).split('/')[0] + '/'

	if (user) {
		store.dispatch(setUserData(user))
		if (forbiddenPaths.some(i => i === route)) {
			if (ctx.res) {
				ctx.res.writeHead(302, {
					Location: Routes.HOME,
				})
				ctx.res.end()
			}
		}
	} else {
		if (!forbiddenPaths.some(i => i === route)) {
			if (ctx.res) {
				ctx.res.writeHead(302, {
					Location: Routes.LOGIN,
				})
				ctx.res.end()
			}
		}
	}

	return {
		pageProps: Component.getInitialProps ? await Component.getInitialProps({...ctx, store,}) : {},
	}
})


export default wrapper.withRedux(App)


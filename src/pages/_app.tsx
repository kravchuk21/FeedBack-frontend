import '../styles/variables.css'
import '../styles/globals.css'
import {wrapper,} from '../store/store'
import React from 'react'
import {AppProps,} from 'next/app'
import {Api,} from './api'
import {setUserData,} from '../store/slices/user'
import {UserInterface,} from '../interfaces/user.interface'
import {ThemeProvider,} from 'next-themes'
import {Routes,} from '../constants/routes'
import {UIProvider,} from '../components/UI'
import {Theme,} from '../../theme'

const App = ({Component, pageProps,}: AppProps) => (
	<ThemeProvider defaultTheme="system" themes={['dark', 'light',]}>
		<UIProvider value={Theme}>
			<div className="container">
				<Component {...pageProps} />
			</div>
		</UIProvider>
	</ThemeProvider>
)

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ctx, Component,}) => {
	try {
		const userData = await Api(ctx).user.getMe()
		store.dispatch(setUserData(userData as UserInterface))
	} catch {
		if (ctx.asPath?.split('/').some(i => i === 'auth') === false) {
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


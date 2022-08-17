import '../styles/variables.css'
import '../styles/globals.css'
import {wrapper,} from '../store/store'
import React from 'react'
import {AppProps,} from 'next/app'
import {selectUserId, setUserData,} from '../store/reducers/user'
import {ThemeProvider,} from 'next-themes'
import {Routes,} from '../constants/routes'
import {UIProvider,} from '../components/UI'
import {Theme,} from '../../theme'
import {Api,} from '../services'
import {UserInterface,} from '../interfaces/user.interface'
import {useAppSelector,} from '../store/hooks'
import {socket,} from '../store/socket'

const App = ({Component, pageProps,}: AppProps) => {
	const userId = useAppSelector(selectUserId)

	React.useEffect(() => {
		if (userId) {
			socket.emit('JOIN', userId)

			return () => {
				socket.close()
			}
		}
	}, [userId,])
	
	return <ThemeProvider defaultTheme="system" themes={['dark', 'light',]}>
		<UIProvider value={Theme}>
			<div className="container">
				<Component {...pageProps} />
			</div>
		</UIProvider>
	</ThemeProvider>
}

const forbiddenPaths = [Routes.AUTH,]

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ctx, Component,}) => {
	const route = '/' + ctx.asPath?.substr(1).split('/')[0] + '/'

	try {
		const {data,} = await Api(ctx).user.getMe()
		store.dispatch(setUserData(data as UserInterface))

		if (forbiddenPaths.some(i => i === route)) {
			if (ctx.res) {
				ctx.res.writeHead(302, {
					Location: Routes.HOME,
				})
				ctx.res.end()
			}
		}
	} catch {
		if (ctx.res) {
			if (!forbiddenPaths.some(i => i === route)) {
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


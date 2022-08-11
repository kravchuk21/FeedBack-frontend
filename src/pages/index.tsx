import type {NextPage,} from 'next'
import Head from 'next/head'
import Header from '../layout/Header'
import IconButton from '../components/UI/IconButton'
import Title from '../components/UI/Title'
import {useRouter,} from 'next/router'
import {Routes,} from '../constants/routes'
import DialogList from '../components/DialogList'
import SearchIcon from '../../public/assets/icons/search.svg'
import MyAvatar from '../components/MyAvatar'
import React from 'react'
import {socket,} from '../store/services/socket'
import {useAppSelector,} from '../store/hooks'
import {selectUserId,} from '../store/reducers/user'

const Home: NextPage = () => {
	const myId = useAppSelector(selectUserId)

	React.useEffect(() => {
		if (myId) {
			socket.emit('DIALOGS:JOIN', myId)
		}
		return () => {
			socket.close()
		}
	}, [myId,])

	return (
		<div>
			<Head>
				<title>FeedBack | Home</title>
				<link rel="icon" href="/public/favicon.ico"/>
			</Head>
			<HomeHeader/>
			<DialogList/>
		</div>
	)
}

const HomeHeader: React.FC = () => {
	const router = useRouter()

	return <Header>
		<IconButton onClick={() => router.push(Routes.SEARCH)} Icon={SearchIcon}/>
		<Title>Home</Title>
		<MyAvatar/>
	</Header>
}

export default Home

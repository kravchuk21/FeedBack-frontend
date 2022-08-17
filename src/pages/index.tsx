import type {NextPage,} from 'next'
import Head from 'next/head'
import Header from '../layout/Header'
import IconButton from '../components/UI/IconButton'
import Title from '../components/UI/Title'
import {useRouter,} from 'next/router'
import {Routes,} from '../constants/routes'
import SearchIcon from '../../public/assets/icons/search.svg'
import MyAvatar from '../components/MyAvatar'
import React from 'react'
import {DialogsContainer,} from '../containers/Dialogs'

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>FeedBack | Home</title>
				<link rel="icon" href="/public/favicon.ico"/>
			</Head>
			<HomeHeader/>
			<DialogsContainer/>
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

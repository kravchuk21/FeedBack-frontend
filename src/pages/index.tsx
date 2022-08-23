import type {NextPage,} from 'next'
import Head from 'next/head'
import Header from '../layout/Header'
import {useRouter,} from 'next/router'
import {Routes,} from '../constants/routes'
import SearchIcon from '../../public/assets/icons/search.svg'
import MyAvatar from '../components/MyAvatar'
import React from 'react'
import {DialogsContainer,} from '../containers/Dialogs'
import {IconButton, Title,} from '../components/UI'

const Home: NextPage = () => (
	<div>
		<Head>
			<title>FeedBack | Home</title>
		</Head>
		<HomeHeader/>
		<DialogsContainer/>
	</div>
)

const HomeHeader: React.FC = () => {
	const router = useRouter()

	return <Header>
		<IconButton onClick={() => router.push(Routes.SEARCH)} Icon={SearchIcon}/>
		<Title>Home</Title>
		<MyAvatar/>
	</Header>
}

export default Home

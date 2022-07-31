import type {NextPage,} from 'next'
import Head from 'next/head'
import Avatar from '../components/Avatar'
import Header from '../layout/Header'
import IconButton from '../components/UI/IconButton'
import Title from '../components/UI/Title'
import {useRouter,} from 'next/router'
import React from 'react'
import SearchUserInput from '../components/SearchUserInput'
import SearchUserItems from '../components/SearchUserItems'

const Search: NextPage = () => {
	const router = useRouter()

	return (
		<div>
			<Head>
				<title>FeedBack | Search</title>
				<meta name="description" content="Generated by create next app"/>
				<link rel="icon" href="/public/favicon.ico"/>
			</Head>
			<Header>
				<IconButton onClick={() => router.back()} iconPath="/assets/icons/back.svg" alt='go back'/>
				<Title>Search</Title>
				<Avatar path="/auth/register" fullName={'Vladislav Kravchuk'}
						avatarUrl={'https://images.unsplash.com/photo-1657264533870-187e6a18ac42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'}/>
			</Header>
			<div className="m-3.5">
				<SearchUserInput/>
			</div>
			<SearchUserItems/>
		</div>
	)
}

export default Search

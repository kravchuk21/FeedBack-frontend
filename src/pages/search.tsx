import type {NextPage,} from 'next'
import Head from 'next/head'
import React from 'react'
import SearchUserInput from '../components/SearchUserInput'
import {UserAPI,} from '../store/services/UserService'
import DialogItemLoader from '../components/loaders/DialogItemLoader'
import Empty from '../components/Empty'
import SearchUserItems from '../components/SearchUserItems'
import Header from '../layout/Header'
import Title from '../components/UI/Title'
import GoBack from '../components/GoBack'
import MyAvatar from '../components/MyAvatar'

const Search: NextPage = () => {
	return <div>
		<Head>
			<title>FeedBack | Search</title>
			<meta name="description" content="Generated by create next app"/>
			<link rel="icon" href="/public/favicon.ico"/>
		</Head>
		<Header>
			<GoBack/>
			<Title>Search</Title>
			<MyAvatar/>
		</Header>
		<SearchContent/>
	</div>
}


const SearchContent = () => {
	const [search, {data, isLoading,},] = UserAPI.useSearchMutation()

	const handleSearch = React.useCallback((query: string) => {
		search(query)
	}, [search,])

	return <div className="m-3.5">
		<SearchUserInput onSearch={handleSearch}/>
		{isLoading && <div>
            <DialogItemLoader/>
            <DialogItemLoader/>
            <DialogItemLoader/>
            <DialogItemLoader/>

        </div>}
		{data && !data.length && <Empty/>}
		{data && !!data.length && <SearchUserItems data={data}/>}
	</div>
}

export default Search

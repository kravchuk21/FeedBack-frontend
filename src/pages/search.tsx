import type {NextPage,} from 'next'
import Head from 'next/head'
import React from 'react'
import SearchUserInput from '../components/SearchUserInput'
import DialogItemLoader from '../components/loaders/DialogItemLoader'
import Empty from '../components/Empty'
import SearchUserItems from '../components/SearchUserItems'
import Header from '../layout/Header'
import GoBack from '../components/GoBack'
import MyAvatar from '../components/MyAvatar'
import {Api,} from '../services'
import {UserInterface,} from '../interfaces/user.interface'
import {Title,} from '../components/UI'

const Search: NextPage = () => {
	return <div>
		<Head>
			<title>FeedBack | Search</title>
		</Head>
		<Header>
			<GoBack/>
			<Title>Search</Title>
			<MyAvatar/>
		</Header>
		<SearchContent/>
	</div>
}


const SearchContent: React.FC = () => {
	const [loading, setLoading,] = React.useState(false)
	const [data, setData,] = React.useState<null | UserInterface[]>(null)

	const handleSearch = React.useCallback(async (query: string) => {
		if (query) {
			setLoading(true)
			try {
				const {data,} = await Api().user.search({text: query,})
				setData(data)
			} catch {
				setData(null)
			}
			setLoading(false)
		}
	}, [])

	return (
		<div className="m-3.5">
			<div className="mb-3.5 flex justify-between">
				<SearchUserInput onSearch={handleSearch}/>
			</div>
			{loading && <SearchLoading/>}
			{data && data.length > 0 && <SearchUserItems data={data}/>}
			{data && data.length === 0 && <Empty/>}
		</div>
	)
}

const SearchLoading: React.FC = React.memo(() => <>
	{
		Array(5)
			.fill(null)
			.map((_, i) => <DialogItemLoader key={i}/>)
	}
</>)

export default Search

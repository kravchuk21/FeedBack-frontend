import React from 'react'
import Input from '../UI/Input'

interface SearchUserInput {
	onSearch: (query: string) => void,
}

const SearchUserInput: React.FC<SearchUserInput> = ({onSearch,}) => {
	const [searchQuery, setSearchQuery,] = React.useState('')

	React.useEffect(() => {
		const timer = setTimeout(() => {
			onSearch(searchQuery)
		}, 500)

		return () => clearTimeout(timer)

	}, [onSearch, searchQuery,])

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.currentTarget.value.trim()
		setSearchQuery(query)
	}

	return <Input placeholder="Enter to find" onChange={onChangeHandler} value={searchQuery}/>
}

export default SearchUserInput

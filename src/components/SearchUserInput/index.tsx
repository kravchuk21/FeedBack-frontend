import React from 'react'
import {fetchSearchUser,} from '../../store/slices/search'
import Input from '../Input'
import {useAppDispatch,} from '../../store/hooks'

const SearchUserInput: React.FC = () => {
	const dispatch = useAppDispatch()
	const [searchQuery, setSearchQuery,] = React.useState('')

	React.useEffect(() => {
		const getSearchData = () => {
			dispatch(fetchSearchUser({text: searchQuery.trim(),}))
		}
		const timer = setTimeout(() => {
			if (searchQuery) {
				getSearchData()
			}
		}, 500)

		return () => clearTimeout(timer)

	}, [dispatch, searchQuery,])

	return <Input placeholder={'Enter to find'} onChange={e => setSearchQuery(e.currentTarget.value)}/>
}

export default SearchUserInput

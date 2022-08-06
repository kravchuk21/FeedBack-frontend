import React from 'react'
import SearchUserItem from '../SearchUserItem'
import {UserInterface,} from '../../interfaces/user.interface'

interface SearchUserItems {
	data: UserInterface[]
}

const SearchUserItems: React.FC<SearchUserItems> = ({data,}) => {

	return <>
		{data && data.map(item => (
			<SearchUserItem key={item._id} _id={item._id} email={item.email} fullName={item.fullName}/>
		))}
	</>
}

export default SearchUserItems

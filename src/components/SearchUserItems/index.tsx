import React from 'react'
import SearchUserItem from '../SearchUserItem'
import {UserInterface,} from '../../interfaces/user.interface'
import Link from 'next/link'
import {Routes,} from '../../constants/routes'

interface SearchUserItems {
	data: UserInterface[]
}

const SearchUserItems: React.FC<SearchUserItems> = ({data,}) => <>
	{data && data.map(item => (
		<Link href={Routes.PROFILE + item._id} key={item._id}>
			<a>
				<SearchUserItem _id={item._id} email={item.email} fullName={item.fullName}/>
			</a>
		</Link>
	))}
</>

export default SearchUserItems

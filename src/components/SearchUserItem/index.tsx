import Link from 'next/link'
import React from 'react'
import Avatar, {IAvatar,} from '../Avatar'
import styles from './SearchUserItem.module.css'
import Typography from '../UI/Typography'
import Title from '../UI/Title'

interface SearchUserItem extends IAvatar {
	_id: string;
	fullName: string;
	email: string;
}

const SearchUserItem: React.FC<SearchUserItem> = (props) => {
	const path = '/profile/' + props._id

	return (
		<Link href={path}>
			<div className={styles.searchUserItem} tabIndex={0}>
				<Avatar fullName={props.fullName} avatarUrl={props.avatarUrl}/>
				<div className={styles.searchUserItemInfo}>
					<Title>{props.fullName}</Title>
					<Typography>{props.email}</Typography>
				</div>
			</div>
		</Link>
	)
}

export default SearchUserItem

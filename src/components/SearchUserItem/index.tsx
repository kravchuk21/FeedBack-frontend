import Link from 'next/link'
import React from 'react'
import Avatar from '../Avatar'
import styles from './SearchUserItem.module.css'
import Typography from '../Typography'
import Title from '../Title'

interface SearchUserItem extends Omit<Avatar, 'path'> {
	_id: string;
	fullName: string;
	email: string;
}

const SearchUserItem: React.FC<SearchUserItem> = (props) => {
	const path = '/profile/' + props._id

	return (
		<Link href={path}>
			<div className={styles.searchUserItem} tabIndex={0}>
				<Avatar path={path} fullName={props.fullName} avatarUrl={props.avatarUrl}/>
				<div className={styles.searchUserItemInfo}>
					<Title>{props.fullName}</Title>
					<Typography>{props.email}</Typography>
				</div>
			</div>
		</Link>
	)
}

export default SearchUserItem

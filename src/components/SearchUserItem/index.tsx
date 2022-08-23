import React from 'react'
import Avatar, {IAvatar,} from '../Avatar'
import {Title, Typography,} from '../UI'
import styles from './SearchUserItem.module.css'

interface SearchUserItem extends IAvatar {
	_id: string;
	fullName: string;
	email: string;
}

const SearchUserItem: React.FC<SearchUserItem> = (props) => (
	<div className={styles.searchUserItem}>
		<Avatar fullName={props.fullName} avatarUrl={props.avatarUrl}/>
		<div className={styles.searchUserItemInfo}>
			<Title>{props.fullName}</Title>
			<Typography>{props.email}</Typography>
		</div>
	</div>
)

export default SearchUserItem

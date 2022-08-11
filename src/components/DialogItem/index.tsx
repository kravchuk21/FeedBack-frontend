import Link from 'next/link'
import React from 'react'
import styles from './DialogItem.module.css'
import Typography from '../UI/Typography'
import Title from '../UI/Title'
import {dateFormat,} from '../../utils/dateFormat'
import Avatar, {IAvatar,} from '../Avatar'
import {Routes,} from '../../constants/routes'

interface DialogItem extends IAvatar {
	_id: string;
	lastMessageText: string;
	lastMessageTime: Date;
}

const DialogItem: React.FC<DialogItem> = (props) => {
	const path = Routes.DIALOG + props._id

	return (
		<Link href={path}>
			<a>
				<div className={styles.dialogItem}>
					<Avatar fullName={props.fullName} avatarUrl={props.avatarUrl}/>
					<div className={styles.dialogItemInfo}>
						<Title>{props.fullName}</Title>
						<Typography>{props.lastMessageText}</Typography>
					</div>
					<Typography>{dateFormat(props.lastMessageTime)}</Typography>
				</div>
			</a>
		</Link>
	)
}

export default DialogItem

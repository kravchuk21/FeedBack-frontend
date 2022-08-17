import React from 'react'
import styles from './DialogItem.module.css'
import Typography from '../UI/Typography'
import Title from '../UI/Title'
import {dateFormat,} from '../../utils/dateFormat'
import Avatar, {IAvatar,} from '../Avatar'

interface DialogItem extends IAvatar {
	_id: string;
	lastMessageText: string;
	lastMessageTime: Date;
}

const DialogItem: React.FC<DialogItem> = (props) => (
	<div className={styles.dialogItem}>
		<Avatar fullName={props.fullName} avatarUrl={props.avatarUrl}/>
		<div className={styles.dialogItemInfo}>
			<Title>{props.fullName}</Title>
			<Typography>{props.lastMessageText}</Typography>
		</div>
		<Typography>{dateFormat(props.lastMessageTime)}</Typography>
	</div>
)

export default DialogItem

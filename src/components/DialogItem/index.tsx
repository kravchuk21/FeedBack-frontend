import React from 'react'
import styles from './DialogItem.module.css'
import Avatar, {IAvatar,} from '../Avatar'
import {Title, Typography, withUITheme, WithUIThemeProps,} from '../UI'
import Time from '../Time'

interface DialogItem extends IAvatar {
	_id: string;
	lastMessageText: string;
	lastMessageTime: Date;
}

const DialogItem: React.FC<DialogItem & WithUIThemeProps> = ({theme, ...props}) => {

	const DialogItemStyles = {
		borderRadius: theme.borderRadius,
	}

	return (
		<div className={styles.dialogItem} style={DialogItemStyles}>
			<Avatar fullName={props.fullName} avatarUrl={props.avatarUrl}/>
			<div className={styles.dialogItemInfo}>
				<Title>{props.fullName}</Title>
				<div className="flex">
					<Typography>{props.lastMessageText}</Typography>
				</div>
			</div>
			<Time time={props.lastMessageTime}/>
		</div>
	)
}

export default React.memo(withUITheme(DialogItem))

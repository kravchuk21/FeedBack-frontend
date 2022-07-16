import Link from 'next/link';
import React from 'react';
import Avatar from '../Avatar';
import styles from './DialogItem.module.css';
import Typography from '../Typography';
import Title from '../Title';

interface DialogItem extends Omit<Avatar, 'path'> {
	_id: string;
	lastMessageText: string;
	lastMessageTime: Date;
}

const DialogItem: React.FC<DialogItem> = (props) => {
	const path = '/dialog/' + props._id;

	return (
		<Link href={path}>
			<div className={styles.dialogItem} tabIndex={0}>
				<Avatar path={path} fullName={props.fullName} avatarUrl={props.avatarUrl}/>
				<div className={styles.dialogItemInfo}>
					<Title>{props.fullName}</Title>
					<Typography className={styles.dialogItemLastMessageText}>{props.lastMessageText}</Typography>
				</div>
				<Typography>{props.lastMessageTime.getMinutes().toString()}</Typography>
			</div>
		</Link>
	);
};

export default DialogItem;

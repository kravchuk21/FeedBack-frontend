import React from 'react'
import DialogItem from '../DialogItem'
import Empty from '../Empty'
import Link from 'next/link'
import {Routes,} from '../../constants/routes'
import {DialogInterface,} from '../../interfaces/dialog.interface'
import {UserInterface,} from '../../interfaces/user.interface'

interface DialogsList {
	items: DialogInterface[];
	isLoading: boolean;
	userId: UserInterface['_id'] | undefined;
}

const DialogsList: React.FC<DialogsList> = ({items, userId, isLoading,}) => (
	<div>
		{isLoading && <h1>Loading...</h1>}
		{!isLoading && items && items.length === 0 && <Empty/>}
		{!isLoading && items && items.map((dialog) => (
			<Link href={Routes.DIALOG + dialog._id} key={dialog._id}>
				<a>
					<DialogItem
						_id={dialog._id}
						lastMessageText={dialog.lastMessage.text}
						lastMessageTime={dialog.lastMessage.updatedAt}
						fullName={dialog.author._id !== userId ? dialog.author.fullName : dialog.mate.fullName}/>
				</a>
			</Link>)
		)}
	</div>
)

// TODO: dialogs loading

export default DialogsList

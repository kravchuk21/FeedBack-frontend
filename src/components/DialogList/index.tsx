import React from 'react'
import DialogItem from '../DialogItem'
import Empty from '../Empty'
import Link from 'next/link'
import {Routes,} from '../../constants/routes'
import {DialogInterface,} from '../../interfaces/dialog.interface'
import {UserInterface,} from '../../interfaces/user.interface'
import DialogItemLoader from '../loaders/DialogItemLoader'

interface DialogsList {
	items: DialogInterface[];
	isLoading: boolean;
	userId: UserInterface['_id'] | undefined;
}

const DialogsList: React.FC<DialogsList> = ({items, userId, isLoading,}) => (
	<div className='container'>
		{!isLoading && !items && <DialogListLoader/>}
		{items && isLoading && items.length === 0 && <Empty/>}
		{isLoading && items && items.map((dialog) => (
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

const DialogListLoader: React.FC = () => <>{Array(5).fill(null).map((_, i) => <DialogItemLoader key={i}/>)}</>

export default DialogsList

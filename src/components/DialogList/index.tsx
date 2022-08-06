import React from 'react'
import {DialogAPI,} from '../../store/services/DialogService'
import DialogItemLoader from '../loaders/DialogItemLoader'
import DialogItem from '../DialogItem'
import Empty from '../Empty'

const DialogList = () => {
	const {data, isSuccess, isLoading,} = DialogAPI.useGetAllUserDialogsQuery()


	if (isLoading) {
		return <Loaders/>
	}

	if (data && data.length === 0) {
		return <Empty/>
	}

	return (
		<div>
			{isSuccess && data.length && data.map((dialog) => {
				return (
					<DialogItem key={dialog._id} _id={dialog._id}
								lastMessageText={'last message'}
								lastMessageTime={new Date()}
								fullName={dialog.author[0].fullName}/>
				)
			})
			}
		</div>
	)
}

const Loaders = () => <>
	<DialogItemLoader/>
	<DialogItemLoader/>
	<DialogItemLoader/>
	<DialogItemLoader/>
</>
export default DialogList

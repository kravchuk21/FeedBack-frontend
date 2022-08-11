import React from 'react'
import {DialogAPI,} from '../../store/services/DialogService'
import DialogItemLoader from '../loaders/DialogItemLoader'
import DialogItem from '../DialogItem'
import Empty from '../Empty'
import {useAppDispatch, useAppSelector,} from '../../store/hooks'
import {selectUserId,} from '../../store/reducers/user'
import {selectDialogs, setDialogs,} from '../../store/reducers/dialogs'
import {socket,} from '../../store/services/socket'

const DialogList = () => {
	const {data, isSuccess, isLoading, refetch,} = DialogAPI.useGetAllUserDialogsQuery()
	const dispatch = useAppDispatch()

	const dialogs = useAppSelector(selectDialogs)
	const myId = useAppSelector(selectUserId)

	React.useEffect(() => {
		socket.on('DIALOG:UPDATED', () => {
			refetch()
		})
	}, [refetch,])

	React.useEffect(() => {
		if (data) {
			dispatch(setDialogs(data))
		}
	}, [data, dispatch,])

	return (
		<div>
			{isLoading && <Loaders/>}
			{dialogs && dialogs.length === 0 && <Empty/>}
			{isSuccess && dialogs && dialogs.length >= 1 && dialogs.map((dialog) => <DialogItem key={dialog._id}
																						   _id={dialog._id}
																						   lastMessageText={dialog.lastMessage[0].text}
																						   lastMessageTime={dialog.lastMessage[0].updatedAt}
																						   fullName={dialog.author[0]._id !== myId ? dialog.author[0].fullName : dialog.mate[0].fullName}/>
			)}
		</div>
	)
}

const Loaders = () => <>
	{Array(5).fill(null).map((_, i) => <DialogItemLoader key={i}/>)}
</>

export default DialogList

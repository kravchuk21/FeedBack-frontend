import DialogsList from '../components/DialogList'
import {useAppDispatch, useAppSelector,} from '../store/hooks'
import React from 'react'
import {DialogInterface,} from '../interfaces/dialog.interface'
import {Api,} from '../services'
import {selectUserId,} from '../store/reducers/user'
import {selectDialogs, setDialog, setDialogs,} from '../store/reducers/dialogs'
import {socket,} from '../store/socket'

export const DialogsContainer = () => {
	const dispatch = useAppDispatch()

	const [isLoading, setIsLoading,] = React.useState(true)

	const userId = useAppSelector(selectUserId)
	const dialogs = useAppSelector(selectDialogs)

	React.useEffect(() => {
		socket.on('DIALOG:UPDATED', (dialog: DialogInterface) => {
			dispatch(setDialog(dialog))
		})

		return () => {
			socket.off('DIALOG:UPDATED')
		}
	}, [dispatch,])

	const fetchDialogs = async () => {
		let dialogs: DialogInterface[] = []
		try {
			const {data,} = await Api().dialogs.getAllUserDialogs()
			dialogs = data
		} catch {
			console.log('error')
		}
		return dialogs
	}

	React.useEffect(() => {
		setIsLoading(false)
		fetchDialogs().then((data) => {
			dispatch(setDialogs(data))
			setIsLoading(true)
		})
	}, [dispatch,])

	return <DialogsList userId={userId} isLoading={isLoading} items={dialogs}/>
}

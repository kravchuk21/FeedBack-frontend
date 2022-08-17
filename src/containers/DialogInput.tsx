import DialogInput from '../components/DialogInput'
import React from 'react'
import {useAppSelector,} from '../store/hooks'
import {selectDialogId, selectMateId,} from '../store/reducers/dialog'
import {socket,} from '../store/socket'

export const DialogInputContainer = () => {
	const [value, setValue,] = React.useState('')
	const dialogId = useAppSelector(selectDialogId)
	const mateId = useAppSelector(selectMateId)

	const handleClick = React.useCallback(() => {
		if (value && dialogId && mateId) {
			socket.emit('MESSAGE:CREATE', {text: value, dialogId, mate: mateId,})
			setValue('')
		}
	}, [dialogId, mateId, value,])

	return <DialogInput value={value} setValue={setValue} handleSend={handleClick} disabled={!mateId || !value}/>
}

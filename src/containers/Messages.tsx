import Messages from '../components/Messages'
import React from 'react'
import {useAppDispatch, useAppSelector,} from '../store/hooks'
import {selectUserId,} from '../store/reducers/user'
import {selectDialogId, selectMessages, setMessage, setMessages,} from '../store/reducers/dialog'
import {Api,} from '../services'
import {MessageInterface,} from '../interfaces/messsge.interfaxe'
import {socket,} from '../store/socket'

export const MessagesContainer = () => {
	const dispatch = useAppDispatch()
	const messagesBottomRef = React.createRef<HTMLDivElement>()
	const [isLoading, setIsLoading,] = React.useState(true)

	const userId = useAppSelector(selectUserId)
	const dialogId = useAppSelector(selectDialogId)
	const messages = useAppSelector(selectMessages)

	const fetchMessages = async (dialogId: string) => {
		let messages: MessageInterface[] = []
		if (dialogId) {
			try {
				const {data,} = await Api().dialog.getAllDialogMessages(dialogId)
				messages = data
			} catch {
				console.log('error')
			}
		}
		return messages
	}

	React.useEffect(() => {
		if (dialogId) {
			fetchMessages(dialogId).then((data) => {
				dispatch(setMessages(data))
				setIsLoading(false)
			})
		}
	}, [dialogId, dispatch,])


	React.useEffect(() => {
		socket.on('MESSAGE:CREATED', (message: MessageInterface) => {
			dispatch(setMessage(message))
		})
	}, [dispatch,])

	React.useEffect(() => {
		messagesBottomRef.current?.scrollIntoView()
	}, [messages, messagesBottomRef,])

	return <Messages messagesBottomRef={messagesBottomRef} items={messages} isLoading={isLoading} userId={userId}/>
}

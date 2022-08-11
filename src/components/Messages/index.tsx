import React from 'react'
import styles from '../../styles/Dialog.module.css'
import Bubble from '../Bubble'
import {useAppDispatch, useAppSelector,} from '../../store/hooks'
import {selectUserId,} from '../../store/reducers/user'
import {socket,} from '../../store/services/socket'
import {setMessage,} from '../../store/reducers/dialog'
import {MessageInterface,} from '../../interfaces/messsge.interfaxe'

const Messages: React.FC = () => {
	const bottomRef = React.useRef<HTMLDivElement | null>(null)
	const messages = useAppSelector(state => state.dialog.messages)
	const dispatch = useAppDispatch()

	React.useEffect(() => {
		// scroll messages to bottom
		if (bottomRef.current) {
			bottomRef.current.scrollIntoView()
		}
	}, [messages,])


	React.useEffect(() => {
		socket.on('MESSAGE:CREATED', (message: MessageInterface) => {
			dispatch(setMessage(message))
		})
	}, [dispatch,])

	const myId = useAppSelector(selectUserId)

	return (
		<div className={styles.bubbleBlock}>
			{messages && messages.map(message => {
				return <Bubble key={message._id} text={message.text} isMe={message.authorId === myId}/>
			})}
			<div ref={bottomRef}/>
		</div>
	)
}

export default Messages

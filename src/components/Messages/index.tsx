import React, {RefObject,} from 'react'
import styles from '../../styles/Dialog.module.css'
import Bubble from '../Bubble'
import {MessageInterface,} from '../../interfaces/messsge.interfaxe'
import Empty from '../Empty'
import {UserInterface,} from '../../interfaces/user.interface'
import BubbleItemLoader from '../loaders/BubbleItemLoader'

interface Messages {
	isLoading: boolean;
	items: MessageInterface[] | null;
	messagesRef: RefObject<HTMLDivElement>;
	userId: UserInterface['_id'] | undefined;
}

const Messages: React.FC<Messages> = ({items, isLoading, messagesRef, userId,}) => (
	<div className={styles.bubbleBlock} ref={messagesRef}>
		{isLoading && <MessagesLoader/>}
		{!isLoading && items && items.length === 0 && <Empty/>}
		{!isLoading && items && items.map(message => {
			return (
				<Bubble
					key={message._id}
					text={message.text}
					isMe={message.author._id === userId}/>
			)
		})}
	</div>
)

const MessagesLoader: React.FC = () => <>{Array(10).fill(null).map((_, i) => <BubbleItemLoader key={i}/>)}</>

export default Messages

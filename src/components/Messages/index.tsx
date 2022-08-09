import React from 'react'
import styles from '../../styles/Dialog.module.css'
import Bubble from '../Bubble'

const Messages = () => {
	const bottomRef = React.useRef<HTMLDivElement | null>(null)

	React.useEffect(() => {
		if (bottomRef.current) {
			bottomRef.current.scrollIntoView({behavior: 'smooth',})
		}
	}, [])

	return (
		<div className={styles.bubbleBlock}>
			<Bubble text="Hello" isMe/>
			<Bubble text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam" isMe/>
			<Bubble text="How are you?" isMe={false}/>
			<Bubble text="Hello" isMe/>
			<Bubble text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam" isMe/>
			<Bubble text="How are you?" isMe={false}/>
			<Bubble text="Hello" isMe/>
			<Bubble text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam" isMe/>
			<Bubble text="How are you?" isMe={false}/>
			<Bubble text="Hello" isMe/>
			<Bubble text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam" isMe/>
			<Bubble text="How are you?" isMe={false}/>
			<Bubble text="Hello" isMe/>
			<Bubble text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam" isMe/>
			<Bubble text="How are you?" isMe={false}/>
			<Bubble text="Hello" isMe/>
			<Bubble text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam" isMe/>
			<Bubble text="How are you?" isMe={false}/>
			<div ref={bottomRef}/>
		</div>
	)
}

export default Messages

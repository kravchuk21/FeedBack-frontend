import React from 'react'
import styles from './Bubble.module.css'
import Typography from '../UI/Typography'

interface Bubble {
    text: string;
    isMe: boolean;
}

const Bubble: React.FC<Bubble> = ({text, isMe,}) => {
    return (
        <div className={`${styles.bubbleBlock} ${isMe && styles.bubbleBlockIsMe}`}>
            <Typography>{text}</Typography>
        </div>
    )
}

export default Bubble

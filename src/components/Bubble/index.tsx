import React from 'react';
import styles from "./Bubble.module.css";
import Typography from '../Typography';

interface Bubble {
    text: string;
    isMe: boolean;
}

const Bubble: React.FC<Bubble> = ({text, isMe}) => {
    return (
        <div className={`${styles.bubbleBlock} ${isMe && styles.bubbleBlockIsMe}`}>
            <Typography className={styles.bubbleBlockText}>{text}</Typography>
        </div>
    );
};

export default Bubble;

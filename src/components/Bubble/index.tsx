import React from 'react';
import styles from "./Bubble.module.css";

interface Bubble {
    text: string;
    isMe: boolean;
}

const Bubble: React.FC<Bubble> = ({text, isMe}) => {
    return (
        <div className={`${styles.bubbleBlock} ${isMe && styles.bubbleBlockIsMe}`}>
            <p className={styles.bubbleBlockText}>{text}</p>
        </div>
    );
};

export default Bubble;

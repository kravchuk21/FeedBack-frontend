import React from 'react';
import styles from "./Bubble.module.css";

interface Bubble {
    text: string;
    isMe: boolean;
}

const Bubble: React.FC<Bubble> = ({text, isMe}) => {
    return (
        <div className={`${styles.bubbleBlock} ${isMe && styles.bubbleBlockIsMe}`}>
            <p>{text}</p>
        </div>
    );
};

export default Bubble;

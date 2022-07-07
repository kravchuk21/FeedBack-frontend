import React from 'react';
import styles from './Button.module.css'
import {MarginType} from "../../types/styles.type";

interface Button extends MarginType {
    text: string;
    disabled?: boolean;
    onClick: () => void;
}

const Button: React.FC<Button> = ({text, disabled = false, onClick, margin = 0}) => {
    const handleClick = () => {
        onClick();
    }

    const style = {
        margin
    }

    return (
        <button disabled={disabled} className={styles.button} onClick={handleClick} style={style}>
            {text}
        </button>
    );
};

export default Button;

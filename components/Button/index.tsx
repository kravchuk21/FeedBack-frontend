import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import styles from './Button.module.css'

interface Button extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text: string;
    disabled?: boolean;
}

const Button: React.FC<Button> = ({text, disabled = false, className, ...props}) => (
    <button disabled={disabled} className={`${styles.button} ${className}`} {...props}>
        {text}
    </button>
);

export default Button;

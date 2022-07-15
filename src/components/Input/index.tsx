import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import styles from './Input.module.css';
import Image from 'next/image';

interface Input extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	icon?: string;
}

const Input = React.forwardRef<HTMLInputElement, Input>(function Input({icon, className, ...props}, ref) {
	const padding = icon ? 60 : 20;

	const inputStyle = {
		paddingRight: padding,
		paddingLeft: padding
	};

	return (
		<div className={`${styles.inputBlock} ${className}`}>
			{icon && <div className={styles.inputIcon}>
                <Image src={icon} height={24} width={24} alt={props.type}/>
            </div>}
			<input style={inputStyle} className={styles.input} {...props} ref={ref}/>
		</div>
	);
});

export default Input;

// TODO: make error state

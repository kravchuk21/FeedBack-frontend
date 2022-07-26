import React, {DetailedHTMLProps, InputHTMLAttributes,} from 'react'
import styles from './Input.module.css'
import Image from 'next/image'
import {pathToIcon,} from '../../constants/images'

interface Input extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	error?: boolean;
	icon?: pathToIcon;
}

const Input = React.forwardRef<HTMLInputElement, Input>(function Input({icon, error, className, ...props}, ref) {
	const padding = icon ? 60 : 20

	const inputStyle = {
		paddingRight: padding,
		paddingLeft: padding,
	}

	return (
		<div className={`${styles.inputBlock} ${className}`}>
			{icon && <div className={styles.inputIcon}>
                <Image src={icon} height={24} width={24} alt={props.type}/>
            </div>}
			<input style={inputStyle} className={`${styles.input} ${error && styles.inputError}`} {...props} ref={ref}/>
		</div>
	)
})

export default Input

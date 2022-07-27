import React, {InputHTMLAttributes,} from 'react'
import styles from './Input.module.css'
import Image from 'next/image'
import {pathToIcon,} from '../../../constants/images'
import {HTMLTag,} from '../@types/HTMLTag'

interface Input extends HTMLTag<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>, Partial<Icon> {
	error?: boolean;
}

type Icon = {
	icon: pathToIcon;
	alt: string
}

const Input = React.forwardRef<HTMLInputElement, Input>(({icon, alt, error, ...props}, ref) => {
	const inputStyle = React.useCallback(() => {
		const padding = icon ? 60 : 20
		return {
			paddingRight: padding,
			paddingLeft: padding,
		}
	}, [icon,])

	return (
		<div className={styles.inputBlock}>
			{icon && (
				<div className={styles.inputIcon}>
					<Image src={icon} height={24} width={24} alt={alt}/>
				</div>
			)}
			<input style={inputStyle()}
				   className={`${styles.input} ${error && styles.inputError}`}
				   {...props}
				   ref={ref}/>
		</div>
	)
})

export default Input

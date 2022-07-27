import React, {ButtonHTMLAttributes,} from 'react'
import styles from './Button.module.css'
import {HTMLTag,} from '../@types/HTMLTag'
import Title from '../Title'
import {FontStyles,} from '../@types/styles'

interface Button extends HTMLTag<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>> {
	children: React.ReactNode;
	disabled?: boolean;
	color?: string;
	textStyles?: FontStyles;
}

const Button: React.FC<Button> = ({disabled = false, textStyles, children, ...props}) => {
	const ButtonStyles = {
		background: props.color,
	}

	return (
		<button disabled={disabled} className={styles.button} {...props} style={ButtonStyles}>
			{
				!disabled && <Title size={18} textAlign="center" color="var(--typography-light)" {...textStyles}>{children}</Title>
			}
			{
				disabled && <Title size={18} textAlign="center" {...textStyles}>{children}</Title>
			}
		</button>
	)
}

export default Button

import React, {ButtonHTMLAttributes,} from 'react'
import Image from 'next/image'
import styles from './IconButton.module.css'
import {HTMLTag,} from '../@types/HTMLTag'

interface IconButton extends HTMLTag<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>> {
	disabled?: boolean;
	color?: string;
	iconPath: string;
	alt: string;
}

const IconButton: React.FC<IconButton> = ({iconPath, disabled = false, alt, ...props}) => {
	const IconButtonStyles = {
		background: props.color,
	}

	return (
		<button {...props} className={styles.iconButton} style={IconButtonStyles} disabled={disabled}>
			<Image className={styles.iconButtonImage} src={iconPath} width={24} height={24} alt={alt}/>
		</button>
	)
}
export default React.memo(IconButton)

import React from 'react'
import styles from './Typography.module.css'
import {HTMLTag,} from '../@types/HTMLTag'
import {FS, FW, TA,} from '../@types/styles'

export interface Typography extends HTMLTag<HTMLParagraphElement> {
	children: React.ReactNode;
	size?: number;
	color?: string;
	fontFamily?: string;
	fontWeight?: FW;
	fontStyle?: FS;
	textAlign?: TA;
}

const Typography: React.FC<Typography> = ({children, ...props}) => {
	const TypographyStyles = {
		fontSize: props.size,
		color: props.color,
		fontFamily: props.fontFamily,
		fontWeight: props.fontWeight,
		fontStyle: props.fontStyle,
		textAlign: props.textAlign,
	}
	return (
		<p className={styles.typography} style={TypographyStyles} {...props}>{children}</p>
	)
}


export default Typography

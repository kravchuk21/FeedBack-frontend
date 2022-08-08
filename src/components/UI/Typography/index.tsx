import React from 'react'
import styles from './Typography.module.css'
import {HTMLTag,} from '../@types/HTMLTag'
import {FontStyles,} from '../@types/styles'
import {withUITheme,} from '../core/withThemeHOC'
import {WithUIThemeProps,} from '../@types/Theme'

export interface Typography extends HTMLTag<HTMLParagraphElement>, FontStyles, WithUIThemeProps {
	children: React.ReactNode;
}

const Typography: React.FC<Typography> = ({children, theme, ...props}) => {
	const TypographyStyles = {
		fontSize: props.size,
		color: props.color || theme.typography,
		fontFamily: props.fontFamily,
		fontWeight: props.fontWeight,
		fontStyle: props.fontStyle,
		textAlign: props.textAlign,
	}

	return (
		<p className={styles.typography} style={TypographyStyles} {...props}>{children}</p>
	)
}

export default React.memo(withUITheme<Typography>(Typography))

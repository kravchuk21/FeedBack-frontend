import React, {ButtonHTMLAttributes,} from 'react'
import styles from './Button.module.css'
import {HTMLTag,} from '../@types/HTMLTag'
import {withUITheme,} from '../core/withThemeHOC'
import {WithUIThemeProps,} from '../@types/Theme'
import Typography from '../Typography'

interface Button extends HTMLTag<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>, WithUIThemeProps {
	children: React.ReactNode;
	disabled?: boolean;
	color?: string;
}

const Button: React.FC<Button> = ({disabled = false, children, ...props}) => {
	const ButtonStyles = {
		background: disabled
			? props.theme.baseLight
			: props.color
			|| props.theme.primary,
		borderRadius: props.theme.borderRadius,
	}

	const TypographyStyles = {
		color: disabled
			? props.theme.typography
			: props.theme.base && props.theme.typographyLight,
	}

	return (
		<button disabled={disabled} className={styles.button} {...props} style={ButtonStyles}>
			<Typography size={18} {...TypographyStyles}>{children}</Typography>
		</button>
	)
}

export default React.memo(withUITheme<Button>(Button))

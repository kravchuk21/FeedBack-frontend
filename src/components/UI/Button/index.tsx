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

const Button: React.FC<Button> = ({disabled = false, children, theme, ...props}) => {
	const ButtonStyles = {
		background: disabled
			? theme.baseLight
			: props.color
			|| theme.primary,
		borderRadius: theme.borderRadius,
	}

	const TypographyStyles = {
		color: disabled
			? theme.typography
			: theme.base && theme.typographyLight,
	}

	return (
		<button disabled={disabled} className={styles.button} {...props} style={ButtonStyles}>
			<Typography size={16} {...TypographyStyles}>{children}</Typography>
		</button>
	)
}

export default React.memo(withUITheme<Button>(Button))

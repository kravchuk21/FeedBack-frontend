import React from 'react'
import Typography from '../Typography'
import {HTMLTag,} from '../@types/HTMLTag'
import {withUITheme,} from '../core/withThemeHOC'
import {WithUIThemeProps,} from '../@types/Theme'
import styles from './Toast.module.css'

export interface Toast extends HTMLTag<HTMLDivElement>, WithUIThemeProps {
	delay?: number;
	message: string | string[];
	type?: ToastType;
}

export type ToastType = 'error' | 'warning' | 'success'

const Toast: React.FC<Toast> = ({message, delay = 3000, type = 'error', theme, ...props}) => {
	const [visible, setVisible,] = React.useState(true)

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false)
		}, delay)
		return () => clearTimeout(timer)
	}, [delay,])

	if (!visible) {
		return <></>
	}

	const toastColor = (type: ToastType): string => {
		switch (type) {
			case 'error':
				return theme.danger
			case 'warning':
				return theme.warning
			case 'success':
				return theme.success
			default:
				return theme.danger
		}
	}

	const ToastStyle = {
		background: toastColor(type),
		borderRadius: theme.borderRadius,
	}

	const TextStyle = {
		color: type === 'warning'
			? theme.typography
			: theme.typographyLight,
	}

	return <div className={styles.toast} style={ToastStyle} {...props}>
		<Typography {...TextStyle}>{message}</Typography>
	</div>
}

export default withUITheme<Toast>(Toast)

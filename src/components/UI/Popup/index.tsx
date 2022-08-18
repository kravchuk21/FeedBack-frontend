import React from 'react'
import styles from './Popup.module.css'
import {OutsideClick, Portal, Title, Typography, withUITheme, WithUIThemeProps,} from '..'

interface Popup {
	children: React.ReactNode;
	onClose: () => void;
	isOpened: boolean;
	title?: string;
}

const Popup: React.FC<Popup & WithUIThemeProps> = ({children, onClose, isOpened, title, theme,}) => {
	const handleEscape = React.useCallback((event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			onClose()
			event.preventDefault()
		}
	}, [onClose,])


	React.useEffect(() => {
		document.addEventListener('keydown', handleEscape, false)

		return () => document.removeEventListener('keydown', handleEscape, false)
	}, [handleEscape,])

	if (!isOpened) {
		return null
	}

	const PopupStyles = {
		background: theme.baseLight,
		borderRadius: theme.borderRadius,
	}

	return (
		<Portal>
			<div className={styles.outside}>
				<OutsideClick onOutsideClick={onClose}>
					<div className={`${styles.popup} p-5`}
						 role="dialog" aria-labelledby="modalTitle"
						 style={PopupStyles}>
						<div className="flex justify-between flex-row-reverse items-center mb-3.5">
							<button onClick={onClose}>
								<Typography color={theme.primary}>close</Typography>
							</button>
							{title && <Title id="modalTitle">{title}</Title>}
						</div>
						{children}
					</div>
				</OutsideClick>
			</div>
		</Portal>
	)
}

export default withUITheme(Popup)

import React from 'react'
import OutsideClick from '../OutsideClick'
import Portal from '../Portal'
import {withUITheme,} from '../UI/core/withThemeHOC'
import styles from './Popup.module.css'
import {WithUIThemeProps,} from '../UI/@types/Theme'
import Typography from '../UI/Typography'
import Title from '../UI/Title'

interface Popup {
	children: React.ReactNode;
	onClose: () => void;
	isOpened: boolean;
	title?: string;
}

const Popup: React.FC<Popup & WithUIThemeProps> = ({children, onClose, isOpened, title, theme,}) => {
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
					<div className={`${styles.popup} p-5`} role="dialog" style={PopupStyles}>
						<div className="flex justify-between items-center mb-3.5">
							{title && <Title>{title}</Title>}
							<Typography color={theme.primary} onClick={onClose} role="button">close</Typography>
						</div>
						{children}
					</div>
				</OutsideClick>
			</div>
		</Portal>
	)
}

export default withUITheme(Popup)

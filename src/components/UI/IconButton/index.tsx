import React, {ButtonHTMLAttributes, SVGProps,} from 'react'
import styles from './IconButton.module.css'
import {HTMLTag,} from '../@types/HTMLTag'
import {withUITheme,} from '../core/withThemeHOC'
import {WithUIThemeProps,} from '../@types/Theme'

type Icon = {
	Icon: React.ComponentType<SVGProps<SVGAElement>>
	color?: string;
}

interface IconButton extends HTMLTag<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>, WithUIThemeProps, Icon {
	disabled?: boolean;
}

const IconButton: React.FC<IconButton> = ({disabled = false, Icon, color, theme, ...props}) => {
	const IconButtonStyles = {
		borderRadius: theme.borderRadius,
		background: theme.baseLight,
	}

	return (
		<button {...props} className={styles.iconButton} style={IconButtonStyles} disabled={disabled}>
			<ButtonIcon color={color || theme.base} Icon={Icon}/>
		</button>
	)

}
const ButtonIcon: React.FC<Icon> = React.memo(({Icon, color,}) => <Icon fill={color}/>)


export default React.memo(withUITheme(IconButton))

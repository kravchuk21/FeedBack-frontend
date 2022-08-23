import React from 'react'
import {withUITheme, WithUIThemeProps,} from '../../UI'
import styles from './AvatarLoader.module.css'

const AvatarLoader: React.FC<WithUIThemeProps> = ({theme,}) => {
	const LoaderStyle = {
		background: theme.baseLight,
	}

	return (
		<div className={`${styles.avatarLoader} animate-pulse`} style={LoaderStyle}/>
	)
}

export default React.memo(withUITheme(AvatarLoader))

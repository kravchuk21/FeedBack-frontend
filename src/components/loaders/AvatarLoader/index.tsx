import React from 'react'
import {withUITheme,} from '../../UI/core/withThemeHOC'
import styles from './AvatarLoader.module.css'
import {WithUIThemeProps,} from '../../UI/@types/Theme'

const AvatarLoader: React.FC<WithUIThemeProps> = ({theme,}) => {
	const LoaderStyle = {
		background: theme.baseLight,
	}

	return (
		<div className={styles.avatarLoader} style={LoaderStyle}/>
	)
}

export default React.memo(withUITheme(AvatarLoader))

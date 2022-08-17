import React from 'react'
import {withUITheme,} from '../../UI/core/withThemeHOC'
import styles from './TextLoader.module.css'
import {WithUIThemeProps,} from '../../UI/@types/Theme'

const TextLoader: React.FC<WithUIThemeProps> = ({theme,}) => {
	const LoaderStyle = {
		background: theme.baseLight,
		borderRadius: theme.borderRadius,
	}

	return (
		<div className={styles.textLoader} style={LoaderStyle}/>
	)
}

export default React.memo(withUITheme(TextLoader))

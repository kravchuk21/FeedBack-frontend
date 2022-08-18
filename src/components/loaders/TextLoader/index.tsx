import React from 'react'
import {withUITheme, WithUIThemeProps,} from '../../UI'
import styles from './TextLoader.module.css'

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

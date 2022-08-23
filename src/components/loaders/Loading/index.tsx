import React, {CSSProperties,} from 'react'
import styles from './Loading.module.css'
import {withUITheme, WithUIThemeProps,} from '../../UI'

const Loading: React.FC<WithUIThemeProps> = ({theme,}) => {

	const LoadingStyle = {
		'--color': theme.primary,
	} as CSSProperties

	return (
		<div className={styles.loading} style={LoadingStyle}>
			<div/>
			<div/>
			<div/>
			<div/>
		</div>
	)
}

export default withUITheme(Loading)

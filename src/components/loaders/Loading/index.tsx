import React, {CSSProperties,} from 'react'
import {withUITheme,} from '../../UI/core/withThemeHOC'
import styles from './Loading.module.css'
import {WithUIThemeProps,} from '../../UI/@types/Theme'

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

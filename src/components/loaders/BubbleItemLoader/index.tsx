import React from 'react'
import styles from './BubbleItemLoader.module.css'
import {withUITheme, WithUIThemeProps,} from '../../UI'


const BubbleItemLoader: React.FC<WithUIThemeProps> = ({theme,}) => {
	const LoaderStyle = {
		background: theme.baseLight,
		borderRadius: theme.borderRadius,
		height: 100 + 'px',
	}

	return (
		<div className={`${styles.bubbleItemLoader} animate-pulse`} style={LoaderStyle}/>
	)
}

export default withUITheme(BubbleItemLoader)

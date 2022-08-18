import React from 'react'
import styles from './BubbleItemLoader.module.css'
import {getRandom,} from '../../../utils/getRandomFromTo'
import {withUITheme, WithUIThemeProps,} from '../../UI'


const SIZES = [40, 50, 80, 400,]

const BubbleItemLoader: React.FC<WithUIThemeProps> = ({theme,}) => {
	const LoaderStyle = {
		background: theme.baseLight,
		borderRadius: theme.borderRadius,
		height: SIZES[getRandom(SIZES.length - 1)] + 'px',
	}

	return (
		<div className={styles.bubbleItemLoader} style={LoaderStyle}/>
	)
}

export default withUITheme(BubbleItemLoader)

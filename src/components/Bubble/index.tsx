import React from 'react'
import styles from './Bubble.module.css'
import Typography from '../UI/Typography'
import {withUITheme,} from '../UI/core/withThemeHOC'
import {WithUIThemeProps,} from '../UI/@types/Theme'

interface Bubble extends WithUIThemeProps {
	text: string;
	isMe: boolean;
}

const Bubble: React.FC<Bubble> = ({text, isMe, theme,}) => {
	const BubbleStyles = {
		background: isMe ? theme.primary : theme.baseLight,
		borderRadius: theme.borderRadius,
	}
	return (
		<div style={BubbleStyles} className={`${styles.bubbleBlock} ${isMe && styles.bubbleBlockIsMe}`}>
			<Typography color={isMe ? theme.typographyLight : theme.typography}>{text}</Typography>
		</div>
	)
}

export default React.memo(withUITheme(Bubble))

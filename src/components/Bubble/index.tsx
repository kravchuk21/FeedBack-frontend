import React from 'react'
import {Typography, withUITheme, WithUIThemeProps,} from '../UI'
import styles from './Bubble.module.css'

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

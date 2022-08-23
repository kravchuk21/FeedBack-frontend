import React from 'react'
import Time from '../Time'
import {Typography, withUITheme, WithUIThemeProps,} from '../UI'
import styles from './Bubble.module.css'

interface Bubble extends WithUIThemeProps {
	text: string;
	isMe: boolean;
	createdAt: Date;
}

const Bubble: React.FC<Bubble> = ({text, isMe, createdAt, theme,}) => {
	const BubbleStyles = {
		background: isMe ? theme.primary : theme.baseLight,
		borderRadius: theme.borderRadius,
		borderBottomRightRadius: isMe ? 0 : theme.borderRadius,
		borderBottomLeftRadius: !isMe ? 0 : theme.borderRadius,
	}
	return (
		<div className={`flex flex-col ${isMe ? 'items-end': 'items-start'} mb-3.5`}>
			<div style={BubbleStyles} className={`${styles.bubbleBlock} ${isMe && styles.bubbleBlockIsMe}`}>
				<Typography color={isMe ? theme.typographyLight : theme.typography}>{text}</Typography>
			</div>
			<div className="mt-1">
				<Time time={createdAt}/>
			</div>
		</div>
	)
}

export default React.memo(withUITheme(Bubble))

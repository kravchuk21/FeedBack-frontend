import React from 'react'
import styles from './Title.module.css'
import {FontStyles,} from '../@types/styles'
import {withUITheme,} from '../core/withThemeHOC'
import {WithUIThemeProps,} from '../@types/Theme'
import {HTMLTag,} from '../@types/HTMLTag'

interface Title extends FontStyles, WithUIThemeProps, HTMLTag<HTMLHeadingElement> {
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	children: React.ReactNode;
}

const Title: React.FC<Title> = ({children, tag = 'h1', theme, ...props}) => {
	const TitleStyles = {
		fontSize: props.size,
		color: props.color || theme.typography,
		fontFamily: props.fontFamily,
		fontWeight: props.fontWeight,
		fontStyle: props.fontStyle,
		textAlign: props.textAlign,
	}

	const HTagProps = {className: styles.title, style: TitleStyles, ...props,}

	switch (tag) {
		case 'h1':
			return <h1 {...HTagProps} >{children}</h1>
		case 'h2':
			return <h2 {...HTagProps}>{children}</h2>
		case 'h3':
			return <h3 {...HTagProps}>{children}</h3>
		case 'h4':
			return <h4 {...HTagProps}>{children}</h4>
		case 'h5':
			return <h5 {...HTagProps}>{children}</h5>
		case 'h6':
			return <h6 {...HTagProps}>{children}</h6>
		default:
			return <h1 {...HTagProps}>{children}</h1>
	}
}

export default React.memo(withUITheme<Title>(Title))

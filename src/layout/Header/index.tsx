import React from 'react'
import {WithUIThemeProps,} from '../../components/UI/@types/Theme'
import {withUITheme,} from '../../components/UI/core/withThemeHOC'

interface Header {
	children: React.ReactNode
}

const Header: React.FC<Header & WithUIThemeProps> = ({children, theme,}) => {
	const HeaderStyles = {
		background: theme.bg,
	}
	return (
		<header className="flex items-center justify-between p-3.5" style={HeaderStyles}>
			{children}
		</header>
	)
}

export default withUITheme(Header)

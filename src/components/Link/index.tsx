import React from 'react'
import NextLink from 'next/link'
import {Typography, withUITheme, WithUIThemeProps,} from '../UI'

interface Link extends WithUIThemeProps {
	children: string;
	href: string;
}

const TextLink: React.FC<Link> = ({children, href, theme,}) => {
	return (
		<NextLink href={href}>
			<a>
				<Typography color={theme.primary}>
					{children}
				</Typography>
			</a>
		</NextLink>
	)
}

export default React.memo(withUITheme(TextLink))

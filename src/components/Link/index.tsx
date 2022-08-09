import React from 'react'
import NextLink from 'next/link'
import Typography from '../UI/Typography'
import {withUITheme,} from '../UI/core/withThemeHOC'
import {WithUIThemeProps,} from '../UI/@types/Theme'

interface Link extends WithUIThemeProps {
	children: string;
	href: string;
}

const TextLink: React.FC<Link> = ({children, href, theme,}) => {
	return (
		<NextLink href={href}>
			<a>
				<Typography color={theme.primaryLight}>
					{children}
				</Typography>
			</a>
		</NextLink>
	)
}

export default React.memo(withUITheme(TextLink))

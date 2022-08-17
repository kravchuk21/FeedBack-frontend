import {useTheme,} from 'next-themes'
import React, {useEffect, useState,} from 'react'
import IconButton from '../UI/IconButton'
import LightIcon from '../../../public/assets/icons/sun.svg'
import DarkIcon from '../../../public/assets/icons/moon.svg'
import {withUITheme,} from '../UI/core/withThemeHOC'
import {WithUIThemeProps,} from '../UI/@types/Theme'

const icons = {
	light: LightIcon,
	dark: DarkIcon,
}

const ThemeChanger: React.FC<WithUIThemeProps> = ({theme,}) => {
	const [mounted, setMounted,] = useState(false)
	const {setTheme, resolvedTheme,} = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	let icon
	switch (resolvedTheme) {
		case 'light' :
			icon = icons.dark
			break
		case 'dark':
			icon = icons.light
			break
		default:
			icon = icons.dark
			break
	}

	const toggleTheme = () => {
		if (resolvedTheme === 'dark') {
			setTheme('light')
		} else if (resolvedTheme === 'light') {
			setTheme('dark')
		}
	}

	return (
		<IconButton onClick={toggleTheme} Icon={icon} color={theme.primary}/>
	)
}
export default React.memo(withUITheme(ThemeChanger))

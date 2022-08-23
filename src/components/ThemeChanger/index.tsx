import {useTheme,} from 'next-themes'
import React from 'react'
import LightIcon from '../../../public/assets/icons/sun.svg'
import DarkIcon from '../../../public/assets/icons/moon.svg'
import {IconButton, withUITheme, WithUIThemeProps, } from '../UI'

const icons = {
	light: LightIcon,
	dark: DarkIcon,
}

const ThemeChanger: React.FC<WithUIThemeProps> = ({theme,}) => {
	const [mounted, setMounted,] = React.useState(false)
	const {setTheme, resolvedTheme,} = useTheme()

	React.useEffect(() => {
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

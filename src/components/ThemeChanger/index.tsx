import {useTheme} from 'next-themes';
import {useEffect, useState} from 'react';
import IconButton from '../IconButton';
import {pathToIcon} from '../../constants/images';

const icons: Record<string, pathToIcon> = {
	light: '/assets/icons/sun.svg',
	dark: '/assets/icons/moon.svg',
};

const ThemeChanger = () => {
	const [mounted, setMounted] = useState(false);
	const {setTheme, resolvedTheme} = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return null;
	}

	let iconPath;
	switch (resolvedTheme) {
		case 'light' :
			iconPath = icons.dark;
			break;
		case 'dark':
			iconPath = icons.light;
			break;
		default:
			iconPath = icons.dark;
			break;
	}
	const toggleTheme = () => {
		if (resolvedTheme === 'dark') {
			setTheme('light');
		} else if (resolvedTheme === 'light') {
			setTheme('dark');
		}
	};

	return (
		<IconButton iconPath={iconPath} onClick={toggleTheme}/>
	);
};
export default ThemeChanger;

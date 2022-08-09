type ThemeType = Partial<{
	borderRadius: number | string
	primary: string,
	primaryLight: string,
	danger: string,
	dangerLight: string,
	base: string,
	baseLight: string,
	typography: string,
	typographyLight: string,
	warning: string,
	success: string,
	bg: string,
}>

export type WithUIThemeProps = {
	theme: Required<ThemeType>
}

export default ThemeType

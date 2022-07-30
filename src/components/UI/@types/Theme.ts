type ThemeType = {
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
}

export type WithUIThemeProps = {
	theme: ThemeType
}

export default ThemeType

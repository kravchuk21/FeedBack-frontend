type ThemeType = Partial<{
	borderRadius: number | string
	primary: string,
	primaryLight: string,
	danger: string,
	dangerLight: string,
	base: string,
	baseLight: string,
	typography: string,
	typographyLight: string
}>

export type WithUIThemeProps = {
	theme: ThemeType
}

export default ThemeType

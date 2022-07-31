import React from 'react'
import {defaultTheme,} from '../defaultTheme'
import {UIContext,} from './themeContext'
import ThemeType, {WithUIThemeProps,} from '../@types/Theme'

const getTheme = (theme: ThemeType | null): Required<ThemeType> => {
	return {
		...defaultTheme,
		...theme,
	}
}

export function withUITheme<T extends WithUIThemeProps = WithUIThemeProps>(
	WrappedComponent: React.ComponentType<T>
) {
	return (props: Omit<T, keyof WithUIThemeProps>) => {
		return (
			<UIContext.Consumer>
				{(context) => {
					return <WrappedComponent  {...(props as T)} theme={getTheme(context)}/>
				}}
			</UIContext.Consumer>
		)
	}
}

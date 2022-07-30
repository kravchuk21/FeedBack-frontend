import React from 'react'
import {defaultTheme,} from '../defaultTheme'
import ThemeType from '../@types/Theme'

export const UIContext = React.createContext<ThemeType | null>(defaultTheme)

export default UIContext.Provider

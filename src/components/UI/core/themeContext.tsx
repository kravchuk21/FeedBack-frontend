import React from 'react'
import {defaultTheme,} from '../defaultTheme'
import ThemeType from '../@types/Theme'

export const UIContext = React.createContext<Partial<ThemeType> | null>(defaultTheme)

export default UIContext.Provider

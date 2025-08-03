import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  ReactElement,
} from 'react'
import {
  ThemeProvider as StyledThemeProvider,
  DefaultTheme,
} from 'styled-components'
import { ThemeMode, ThemeContextInterface } from '@/types/theme'
import { lightTheme, darkTheme } from '@/styles/theme'

const ThemeContext = createContext<ThemeContextInterface>({
  toggleTheme: () => {},
})

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode
}): ReactElement => {
  const [theme, setTheme] = useState<ThemeMode>('light')

  useEffect((): void => {
    const saved = localStorage.getItem('theme') as ThemeMode
    if (saved) setTheme(saved)
  }, [])

  const toggleTheme = (): void => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const themeObject: DefaultTheme = theme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <StyledThemeProvider theme={themeObject}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextInterface => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

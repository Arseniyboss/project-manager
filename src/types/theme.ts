export type Theme = 'light' | 'dark'

export type ThemeStyles = {
  background: string
  color: string
  columnColor: string
}

export type Themes = Record<Theme, ThemeStyles>

export type ThemeContextType = {
  theme: Theme
  themeStyles: ThemeStyles
  toggleTheme: () => void
}

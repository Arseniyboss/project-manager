export type Theme = 'light' | 'dark'

export type ThemeStyles = {
  background: string
  color: string
  boardColumnColor: string
  taskCardColor: string
  subtaskCardColor: string
  sidebarColor: string
  currentBoardColor: string
  currentBoardShadowColor: string
}

export type Themes = Record<Theme, ThemeStyles>

export type ThemeContextType = {
  theme: Theme
  themeStyles: ThemeStyles
  toggleTheme: () => void
}

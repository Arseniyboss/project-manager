import { FaMoon } from 'react-icons/fa'
import { ImSun } from 'react-icons/im'
import { Button } from '@/styles'
import { useTheme } from '@/hooks/useTheme'

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <Button
      onClick={toggleTheme}
      aria-label={`switch theme to ${theme === 'light' ? 'dark' : 'light'}`}
    >
      {theme === 'light' ? (
        <FaMoon className="sidebarIcon" />
      ) : (
        <ImSun className="sidebarIcon" />
      )}
    </Button>
  )
}

export default ThemeSwitcher

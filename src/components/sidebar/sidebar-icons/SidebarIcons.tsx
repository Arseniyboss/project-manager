import { Link } from 'react-router-dom'
import { FiSidebar, FiHome } from 'react-icons/fi'
import { Button } from '@/styles'
import { FlexGroup } from '@/components/sidebar/styles'
import { IconGroup } from './styles'
// import { IconGroup, UserAvatar } from './styles'
// import { useTheme } from '@/hooks/useTheme'
import { useSidebarContext } from '@/hooks/useSidebarContext'
import ThemeSwitcher from '@/components/sidebar/sidebar-icons/ThemeSwitcher'

const SidebarIcons = () => {
  // const userInitials = 'JD'
  // const { themeStyles } = useTheme()
  const { toggleSidebar } = useSidebarContext()
  return (
    <FlexGroup>
      <IconGroup>
        <Button
          onClick={toggleSidebar}
          aria-label="close sidebar"
          data-testid="close-sidebar-button"
        >
          <FiSidebar className="sidebarIcon" />
        </Button>
        <Button as={Link} to="/">
          <FiHome className="sidebarIcon" />
        </Button>
      </IconGroup>
      {/* <IconGroup>
        <UserAvatar $themeStyles={themeStyles}>{userInitials}</UserAvatar>
        <ThemeSwitcher />
      </IconGroup> */}
      <ThemeSwitcher />
    </FlexGroup>
  )
}

export default SidebarIcons

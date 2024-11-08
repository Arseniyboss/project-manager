import { Link } from 'react-router-dom'
import { FiSidebar, FiHome } from 'react-icons/fi'
import { Button } from '@/styles'
import { FlexGroup, IconGroup } from '@/components/sidebar/styles'
import { useSidebarContext } from '@/hooks/useSidebarContext'
import ThemeSwitcher from '@/components/sidebar/sidebar-icons/ThemeSwitcher'

const SidebarIcons = () => {
  const { toggleSidebar, handleLinkClick } = useSidebarContext()
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
        <Button as={Link} to="/" onClick={handleLinkClick}>
          <FiHome className="sidebarIcon" />
        </Button>
      </IconGroup>
      <ThemeSwitcher />
    </FlexGroup>
  )
}

export default SidebarIcons

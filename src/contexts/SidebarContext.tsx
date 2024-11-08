import { ReactNode, createContext, useEffect, useState } from 'react'
import { useTaskContext } from '@/hooks/useTaskContext'
import { isMobileViewport } from '@/utils'

export type SidebarContextType = {
  isDesktopSidebarOpen: boolean
  isSidebarOpen: boolean
  toggleSidebar: () => void
  closeMobileSidebar: () => void
  handleLinkClick: () => void
}

type Props = {
  children: ReactNode
}

export const SidebarContext = createContext<SidebarContextType | null>(null)

export const SidebarContextProvider = ({ children }: Props) => {
  const [isMobile, setIsMobile] = useState(() => isMobileViewport())
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true)

  const { setIsAdding } = useTaskContext()

  const isSidebarOpen = isMobile ? isMobileSidebarOpen : isDesktopSidebarOpen

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileSidebarOpen((prevState) => !prevState)
    } else {
      setIsDesktopSidebarOpen((prevState) => !prevState)
    }
  }

  const closeMobileSidebar = () => {
    if (isMobile) {
      setIsMobileSidebarOpen(false)
    }
  }

  const handleLinkClick = () => {
    closeMobileSidebar()
    setIsAdding(false)
  }

  const handleResize = () => {
    setIsMobile(isMobileViewport())
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const value = {
    isDesktopSidebarOpen,
    isSidebarOpen,
    toggleSidebar,
    closeMobileSidebar,
    handleLinkClick,
  }

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

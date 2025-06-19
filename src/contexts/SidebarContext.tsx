import { ReactNode, createContext, useEffect, useState } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { isMobileViewport } from '@/utils'

export type SidebarContextType = {
  isDesktopSidebarOpen: boolean
  isSidebarOpen: boolean
  toggleSidebar: () => void
  closeMobileSidebar: () => void
}

type Props = {
  children: ReactNode
}

export const SidebarContext = createContext<SidebarContextType | null>(null)

export const SidebarContextProvider = ({ children }: Props) => {
  const [isMobile, setIsMobile] = useState(() => isMobileViewport())
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useLocalStorage(
    'isDesktopSidebarOpen',
    true
  )

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
  }

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

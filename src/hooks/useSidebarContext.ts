import { useContext } from 'react'
import { SidebarContext } from '@/contexts/SidebarContext'

export const useSidebarContext = () => {
  const sidebarContext = useContext(SidebarContext)

  if (!sidebarContext) {
    throw new Error('useSidebarContext must be used within its provider')
  }

  return sidebarContext
}

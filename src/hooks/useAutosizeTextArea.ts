import { RefObject, useLayoutEffect } from 'react'
import { useSidebarContext } from './useSidebarContext'

type Ref = RefObject<HTMLTextAreaElement>

export const useAutoResizeTextArea = (ref: Ref, resizeTrigger: string) => {
  const { isDesktopSidebarOpen } = useSidebarContext()

  const handleResize = () => {
    const textarea = ref.current
    if (!textarea) return
    textarea.style.height = 'auto' // adjusts height when deleting multiple lines of text
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  useLayoutEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [resizeTrigger, isDesktopSidebarOpen])
}

import { RefObject, useCallback, useLayoutEffect } from 'react'
import { useSidebarContext } from './useSidebarContext'

type Ref = RefObject<HTMLTextAreaElement>

export const useAutoResizeTextarea = (ref: Ref, value: string) => {
  const { isDesktopSidebarOpen } = useSidebarContext()

  const handleResize = useCallback(() => {
    const textarea = ref.current
    if (!textarea) return
    textarea.style.height = 'auto' // adjusts height when deleting multiple lines of text
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [ref])

  useLayoutEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize, ref, value, isDesktopSidebarOpen])
}

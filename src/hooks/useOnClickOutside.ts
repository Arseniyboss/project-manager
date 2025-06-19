import { RefObject, useEffect } from 'react'

type Ref = RefObject<HTMLElement | null>

export const useOnClickOutside = (ref: Ref, callback: () => void) => {
  const handleClickOutside = (e: MouseEvent | TouchEvent) => {
    if (!ref.current?.contains(e.target as Node)) {
      callback()
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [ref, callback])
}

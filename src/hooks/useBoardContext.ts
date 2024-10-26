import { useContext } from 'react'
import { BoardContext } from '@/contexts/BoardContext'

export const useBoardContext = () => {
  const boardContext = useContext(BoardContext)

  if (!boardContext) {
    throw new Error('useBoardContext must be used within BoardContextProvider')
  }

  return boardContext
}

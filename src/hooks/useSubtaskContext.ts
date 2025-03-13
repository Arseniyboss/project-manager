import { useContext } from 'react'
import { SubtaskContext } from '@/contexts/SubtaskContext'

export const useSubtaskContext = () => {
  const subtaskContext = useContext(SubtaskContext)

  if (!subtaskContext) {
    throw new Error('useSubtaskContext must be used within SubtaskContextProvider')
  }

  return subtaskContext
}

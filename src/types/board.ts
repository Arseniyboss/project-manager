import { Dispatch, SetStateAction } from 'react'
import { DropResult } from '@hello-pangea/dnd'

export type Board = {
  id: string
  title: string
}

// ensures correct return types for types that use Board type in Sidebar Board component
export type BoardType = Board

export type BoardView = 'kanban' | 'calendar'

export type BoardContextType = {
  isAdding: boolean
  boards: Board[]
  getCurrentBoard: (id: string) => Board | undefined
  getAdjacentBoard: (currentBoardId: string) => Board | undefined
  calculateBoardProgress: (boardId: string) => number
  setIsAdding: Dispatch<SetStateAction<boolean>>
  addBoard: (id: string, title: string) => void
  deleteBoard: (id: string) => void
  editBoard: (id: string, title: string) => void
  handleDrag: (result: DropResult) => void
}

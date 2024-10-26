import { Dispatch, SetStateAction } from 'react'
import { DropResult } from 'react-beautiful-dnd'

export type Board = {
  id: string
  title: string
  type?: 'all-tasks'
}

// ensures correct return types for types that use Board type in Sidebar Board component
export type BoardType = Board

export type BoardContextType = {
  isAdding: boolean
  boards: Board[]
  allTasksBoard: Board
  isAllTasksBoard: (id: string) => boolean
  getCurrentBoard: (id: string) => Board | undefined
  getAdjacentBoard: (currentBoardId: string) => Board
  setIsAdding: Dispatch<SetStateAction<boolean>>
  addBoard: (id: string, title: string) => void
  deleteBoard: (id: string) => void
  editBoard: (id: string, title: string) => void
  handleDrag: (result: DropResult) => void
}

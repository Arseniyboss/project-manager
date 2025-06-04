import { Dispatch, SetStateAction } from 'react'
import { DropResult } from '@hello-pangea/dnd'

export type Status = 'To Do' | 'In Progress' | 'Done'

export type Task = {
  id: string
  boardId: string
  title: string
  status: Status
  dueDate?: string
}

export interface CalendarTask extends Task {
  dueDate: string
}

export type CurrentStatus = Status | ''

export type TaskContextType = {
  statuses: Status[]
  tasks: Task[]
  isAdding: boolean
  isCurrentColumn: (status: Status) => boolean
  setIsAdding: Dispatch<SetStateAction<boolean>>
  handleAdd: (status: Status) => void
  handleDrag: (result: DropResult) => void
  addTask: (boardId: string, title: string, status: Status) => void
  deleteTask: (id: string) => void
  deleteBoardTasks: (boardId: string) => void
  editTask: (id: string, title: string) => void
  addDueDate: (id: string, dueDate: string) => void
  filterBoardTasks: (status: Status, boardId?: string) => Task[]
  filterCalendarTasks: (boardId?: string) => CalendarTask[]
}

import { Dispatch, SetStateAction } from 'react'
import { DropResult } from '@hello-pangea/dnd'

export type Subtask = {
  id: string
  taskId: string
  title: string
  checked: boolean
}

export type SubtaskContextType = {
  isAdding: boolean
  isSubtaskHovered: boolean
  subtasks: Subtask[]
  setSubtasks: Dispatch<SetStateAction<Subtask[]>>
  setIsAdding: Dispatch<SetStateAction<boolean>>
  setIsSubtaskHovered: Dispatch<SetStateAction<boolean>>
  handleAdd: (taskId: string) => void
  isCurrentTask: (taskId: string) => boolean
  addSubtask: (taskId: string, title: string) => void
  deleteSubtask: (id: string) => void
  deleteTaskSubtasks: (taskId: string) => void
  editSubtask: (id: string, title: string) => void
  toggleSubtask: (id: string) => void
  filterSubtasks: (taskId: string) => Subtask[]
  handleDrag: (result: DropResult) => void
}

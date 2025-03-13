import { ReactNode, createContext, useState } from 'react'
import { DropResult } from '@hello-pangea/dnd'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Subtask, SubtaskContextType } from '@/types/subtask'

type Props = {
  children: ReactNode
}

export const SubtaskContext = createContext<SubtaskContextType | null>(null)

export const SubtaskContextProvider = ({ children }: Props) => {
  const [subtasks, setSubtasks] = useLocalStorage<Subtask[]>('subtasks', [])
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [isSubtaskHovered, setIsSubtaskHovered] = useState<boolean>(false)
  const [currentTaskId, setCurrentTaskId] = useState<string>('')

  const isCurrentTask = (taskId: string) => {
    return taskId === currentTaskId
  }

  const handleAdd = (taskId: string) => {
    setIsAdding(true)
    setCurrentTaskId(taskId)
  }

  const filterSubtasks = (taskId: string) => {
    const filteredSubtasks = subtasks.filter((subtask) => subtask.taskId === taskId)
    return filteredSubtasks
  }

  const addSubtask = (taskId: string, title: string) => {
    setSubtasks([...subtasks, { id: crypto.randomUUID(), taskId, title, checked: false }])
  }

  const deleteSubtask = (id: string) => {
    const filteredSubtasks = subtasks.filter((subtask) => subtask.id !== id)
    setSubtasks(filteredSubtasks)
  }

  const deleteTaskSubtasks = (taskId: string) => {
    const filteredSubtasks = subtasks.filter((subtask) => subtask.taskId !== taskId)
    setSubtasks(filteredSubtasks)
  }

  const editSubtask = (id: string, title: string) => {
    const updatedSubtasks = subtasks.map((subtask) => {
      return subtask.id === id ? { ...subtask, title } : subtask
    })
    setSubtasks(updatedSubtasks)
  }

  const toggleSubtask = (id: string) => {
    const updatedSubtasks = subtasks.map((subtask) => {
      return subtask.id === id ? { ...subtask, checked: !subtask.checked } : subtask
    })
    setSubtasks(updatedSubtasks)
  }

  const reorderSubtasks = (subtask: Subtask, newSubtaskIndex: number) => {
    const reorderedSubtasks = [...subtasks]
    const taskSubtasks = filterSubtasks(subtask.taskId)
    const updatedSubtask = taskSubtasks[newSubtaskIndex]
    const draggableSubtaskIndex = subtasks.findIndex(({ id }) => id === subtask.id)
    const updatedSubtaskIndex = subtasks.findIndex(({ id }) => id === updatedSubtask.id)
    // remove the subtask from the old position
    reorderedSubtasks.splice(draggableSubtaskIndex, 1)
    // insert the subtask into the new position
    reorderedSubtasks.splice(updatedSubtaskIndex, 0, subtask)
    return reorderedSubtasks
  }

  const handleDrag = (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination) return

    const subtaskIndex = source.index
    const newSubtaskIndex = destination.index

    if (subtaskIndex === newSubtaskIndex) return

    const draggableSubtask = subtasks.find((subtask) => subtask.id === draggableId)!

    const reorderedSubtasks = reorderSubtasks(draggableSubtask, newSubtaskIndex)
    setSubtasks(reorderedSubtasks)
  }

  const value = {
    isAdding,
    isSubtaskHovered,
    subtasks,
    setSubtasks,
    setIsAdding,
    setIsSubtaskHovered,
    handleAdd,
    isCurrentTask,
    addSubtask,
    deleteSubtask,
    deleteTaskSubtasks,
    editSubtask,
    toggleSubtask,
    filterSubtasks,
    handleDrag,
  }

  return <SubtaskContext.Provider value={value}>{children}</SubtaskContext.Provider>
}

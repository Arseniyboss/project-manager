import { ReactNode, createContext, useState } from 'react'
import { DropResult } from '@hello-pangea/dnd'
import { TaskContextType, Task, Status, CurrentStatus } from '@/types/task'
import { useLocalStorage } from '@/hooks/useLocalStorage'

type Props = {
  children: ReactNode
}

export const TaskContext = createContext<TaskContextType | null>(null)

export const TaskContextProvider = ({ children }: Props) => {
  const statuses: Status[] = ['To Do', 'In Progress', 'Done']

  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [currentStatus, setCurrentStatus] = useState<CurrentStatus>('')

  const isCurrentColumn = (status: Status) => {
    return status === currentStatus
  }

  const filterTasks = (status: Status, boardId?: string) => {
    return tasks.filter((task) => {
      const matchesBoard = boardId ? task.boardId === boardId : true
      return matchesBoard && task.status === status
    })
  }

  const dragTask = (task: Task, newStatus: Status, newIndex: number) => {
    const reorderedTasks = [...tasks]
    const boardColumnTasks = filterTasks(newStatus, task.boardId)
    const updatedTask = boardColumnTasks[newIndex]
    const draggableTaskIndex = tasks.findIndex(({ id }) => id === task.id)
    const updatedTaskIndex = tasks.findIndex(({ id }) => id === updatedTask.id)
    // remove a task from the column from which it is being dragged
    reorderedTasks.splice(draggableTaskIndex, 1)
    // add the dragged task to a new column
    reorderedTasks.splice(updatedTaskIndex, 0, task)
    return reorderedTasks
  }

  const handleDrag = (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination) return

    const currentIndex = source.index
    const newIndex = destination.index
    const currentStatus = source.droppableId as Status
    const newStatus = destination.droppableId as Status

    if (currentIndex === newIndex && currentStatus === newStatus) return

    const draggableTask = tasks.find((task) => task.id === draggableId)!

    if (newStatus !== currentStatus) {
      draggableTask.status = newStatus
    }

    const reorderedTasks = dragTask(draggableTask, newStatus, newIndex)

    setTasks(reorderedTasks)
  }

  const handleAdd = (status: Status) => {
    setIsAdding(true)
    setCurrentStatus(status)
  }

  const addTask = (boardId: string, title: string, status: Status) => {
    setTasks([...tasks, { id: crypto.randomUUID(), boardId, title, status }])
  }

  const deleteTask = (id: string) => {
    const filteredTasks = tasks.filter((task) => task.id !== id)
    setTasks(filteredTasks)
  }

  const deleteBoardTasks = (boardId: string) => {
    const filteredTasks = tasks.filter((task) => task.boardId !== boardId)
    setTasks(filteredTasks)
  }

  const editTask = (id: string, title: string) => {
    const updatedTasks = tasks.map((task) => {
      return task.id === id ? { ...task, title } : task
    })
    setTasks(updatedTasks)
  }

  const value = {
    statuses,
    tasks,
    isAdding,
    isCurrentColumn,
    setIsAdding,
    handleAdd,
    handleDrag,
    addTask,
    deleteTask,
    deleteBoardTasks,
    editTask,
    filterTasks,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

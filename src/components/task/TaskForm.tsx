import { FaCircleCheck } from 'react-icons/fa6'
import { isMobile } from 'react-device-detect'
import { KeyboardEvent, useState, useRef, useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { useTaskContext } from '@/hooks/useTaskContext'
import { useAutoResizeTextArea } from '@/hooks/useAutosizeTextArea'
import { Status } from '@/types/task'
import { Button } from '@/styles'
import { Card } from './styles'

type Props = {
  status: Status
  boardId: string
}

const TaskForm = ({ status, boardId }: Props) => {
  const [title, setTitle] = useState<string>('')

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { themeStyles } = useTheme()
  const { isAdding, setIsAdding, addTask } = useTaskContext()

  useAutoResizeTextArea(textareaRef, title)

  useEffect(() => {
    if (isAdding) {
      textareaRef.current?.focus()
    }
  }, [isAdding])

  const handleAddTask = () => {
    if (!title) return
    addTask(boardId, title.trim(), status)
    setIsAdding(false)
  }

  const handleEnter = (e: KeyboardEvent) => {
    if (isMobile || e.key !== 'Enter' || e.shiftKey) return
    e.preventDefault()
    handleAddTask()
  }
  return (
    <Card $themeStyles={themeStyles}>
      <textarea
        value={title}
        ref={textareaRef}
        rows={1}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleEnter}
        data-testid="add-task-input"
      />
      <Button onClick={handleAddTask} aria-label="add task" data-testid="add-task-button">
        <FaCircleCheck />
      </Button>
    </Card>
  )
}

export default TaskForm

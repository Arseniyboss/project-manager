import { useState, useRef } from 'react'
import { DraggableProvided } from '@hello-pangea/dnd'
import { LuClipboardPlus } from 'react-icons/lu'
import { FaTrashAlt } from 'react-icons/fa'
import { useTheme } from '@/hooks/useTheme'
import { useTaskContext } from '@/hooks/useTaskContext'
import { useSubtaskContext } from '@/hooks/useSubtaskContext'
import { useBoardContext } from '@/hooks/useBoardContext'
import { useAutoResizeTextArea } from '@/hooks/useAutosizeTextArea'
import { useUpdateEffect } from '@/hooks/useUpdateEffect'
import { Task as TaskProps } from '@/types/task'
import { Button } from '@/styles'
import { Card, CardBody, CardFooter, IconGroup, Tag } from './styles'
import SubtaskList from '@/components/subtask/SubtaskList'
import DueDate from './DueDate'

type CustomProps = {
  showAllTasks?: boolean
}

type Props = TaskProps & DraggableProvided & CustomProps

const Task = (props: Props) => {
  const {
    id,
    boardId,
    title,
    dueDate,
    showAllTasks,
    draggableProps,
    dragHandleProps,
    innerRef,
  } = props

  const [task, setTask] = useState<string>(title)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { themeStyles } = useTheme()
  const { deleteTask, editTask } = useTaskContext()
  const { getCurrentBoard } = useBoardContext()
  const { filterSubtasks, handleAdd } = useSubtaskContext()

  const board = getCurrentBoard(boardId)
  const subtasks = filterSubtasks(id)

  useAutoResizeTextArea(textareaRef, task)

  useUpdateEffect(() => {
    const trimmedTask = task.trim()
    if (!trimmedTask) return
    editTask(id, trimmedTask)
  }, [task])

  return (
    <Card
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
      $themeStyles={themeStyles}
      data-testid="task"
    >
      <CardBody>
        <textarea
          value={task}
          ref={textareaRef}
          rows={1}
          onChange={(e) => setTask(e.target.value)}
          aria-label="edit task input"
          data-testid="edit-task-input"
        />
        <IconGroup>
          <Button
            onClick={() => handleAdd(id)}
            aria-label="add subtask"
            data-testid="add-subtask-button"
          >
            <LuClipboardPlus size={20} />
          </Button>
          <Button
            onClick={() => deleteTask(id)}
            aria-label="delete task"
            data-testid="delete-task-button"
          >
            <FaTrashAlt size={19} />
          </Button>
        </IconGroup>
      </CardBody>
      <SubtaskList subtasks={subtasks} taskId={id} />
      <CardFooter>
        {showAllTasks && <Tag $themeStyles={themeStyles}>{board!.title}</Tag>}
        <DueDate taskId={id} dueDate={dueDate} />
      </CardFooter>
    </Card>
  )
}

export default Task

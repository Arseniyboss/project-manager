import { Droppable, Draggable } from '@hello-pangea/dnd'
import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { useTaskContext } from '@/hooks/useTaskContext'
import { useUpdateEffect } from '@/hooks/useUpdateEffect'
import { scrollToBottom } from '@/utils'
import { Status } from '@/types/task'
import { Button } from '@/styles'
import { BoardContainer, BoardHeader } from './styles'
import Task from '@/components/task/Task'
import TaskForm from '@/components/task/TaskForm'
import { useSubtaskContext } from '@/hooks/useSubtaskContext'

type Props = {
  status: Status
  boardId: string
  showAllTasks?: boolean
}

const BoardColumn = ({ status, boardId, showAllTasks }: Props) => {
  const taskListRef = useRef<HTMLUListElement>(null)

  const {
    isAdding,
    isDatePickerOpen,
    isCurrentColumn,
    handleAdd,
    filterBoardTasks,
    sortTasksByDueDate,
  } = useTaskContext()

  const { isSubtaskHovered } = useSubtaskContext()
  const { themeStyles } = useTheme()

  const tasks = showAllTasks
    ? sortTasksByDueDate(filterBoardTasks(status))
    : filterBoardTasks(status, boardId)

  const isDragDisabled = isAdding || isSubtaskHovered || isDatePickerOpen || showAllTasks

  useUpdateEffect(() => {
    if (isCurrentColumn(status)) {
      scrollToBottom(taskListRef.current)
    }
  }, [isAdding])
  return (
    <BoardContainer $themeStyles={themeStyles}>
      <BoardHeader>
        <h2>{status}</h2>
        {!showAllTasks && (
          <Button
            onClick={() => handleAdd(status)}
            aria-label="add task"
            data-testid="add-task-button"
          >
            <FaPlus size={18} />
          </Button>
        )}
      </BoardHeader>
      <Droppable droppableId={status}>
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={(node) => {
              provided.innerRef(node)
              taskListRef.current = node
            }}
            data-testid="task-list"
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                index={index}
                draggableId={task.id}
                isDragDisabled={isDragDisabled}
              >
                {(provided) => (
                  <Task
                    key={task.id}
                    showAllTasks={showAllTasks}
                    taskListRef={taskListRef}
                    {...task}
                    {...provided}
                  />
                )}
              </Draggable>
            ))}
            {isAdding && isCurrentColumn(status) && (
              <TaskForm status={status} boardId={boardId} taskListRef={taskListRef} />
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </BoardContainer>
  )
}

export default BoardColumn

import { Droppable, Draggable } from '@hello-pangea/dnd'
import { FaPlus } from 'react-icons/fa'
import { useTheme } from '@/hooks/useTheme'
import { useTaskContext } from '@/hooks/useTaskContext'
import { Status } from '@/types/task'
import { Button } from '@/styles'
import { BoardContainer, BoardHeader } from './styles'
import Task from '@/components/task/Task'
import TaskForm from '@/components/task/TaskForm'

type Props = {
  status: Status
  boardId: string
  showAllTasks?: boolean
}

const BoardColumn = ({ status, boardId, showAllTasks }: Props) => {
  const { themeStyles } = useTheme()
  const { isAdding, isCurrentColumn, handleAdd, filterTasks } = useTaskContext()
  const tasks = showAllTasks ? filterTasks(status) : filterTasks(status, boardId)
  const isDragDisabled = isAdding || showAllTasks
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
            ref={provided.innerRef}
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
                    {...task}
                    {...provided}
                  />
                )}
              </Draggable>
            ))}
            {isAdding && isCurrentColumn(status) && (
              <TaskForm status={status} boardId={boardId} />
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </BoardContainer>
  )
}

export default BoardColumn

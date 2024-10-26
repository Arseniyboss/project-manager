import { Droppable, Draggable } from 'react-beautiful-dnd'
import { FaPlus } from 'react-icons/fa'
import { useTheme } from '@/hooks/useTheme'
import { useBoardContext } from '@/hooks/useBoardContext'
import { useTaskContext } from '@/hooks/useTaskContext'
import { Status } from '@/types/task'
import { Button } from '@/styles'
import { BoardContainer, BoardHeader } from './styles'
import Task from '@/components/task/Task'
import TaskForm from '@/components/task/TaskForm'

type Props = {
  status: Status
  boardId: string
}

const BoardColumn = ({ status, boardId }: Props) => {
  const { themeStyles } = useTheme()
  const { isAllTasksBoard } = useBoardContext()
  const { isAdding, isCurrentColumn, handleAdd, getBoardColumnTasks } = useTaskContext()
  const boardColumnTasks = getBoardColumnTasks(boardId, status)
  const isDragDisabled = isAdding || isAllTasksBoard(boardId)
  return (
    <BoardContainer $themeStyles={themeStyles}>
      <BoardHeader>
        <h2>{status}</h2>
        {!isAllTasksBoard(boardId) && (
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
            {boardColumnTasks.map((task, index) => (
              <Draggable
                key={task.id}
                index={index}
                draggableId={task.id}
                isDragDisabled={isDragDisabled}
              >
                {(provided) => <Task key={task.id} {...task} {...provided} />}
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

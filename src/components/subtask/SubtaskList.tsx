import { isMobile } from 'react-device-detect'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { useSubtaskContext } from '@/hooks/useSubtaskContext'
import { Subtask as SubtaskType } from '@/types/subtask'
import { SubtaskListContainer } from './styles'
import Subtask from './Subtask'
import SubtaskForm from './SubtaskForm'

type Props = {
  subtasks: SubtaskType[]
  taskId: string
}

const SubtaskList = ({ subtasks, taskId }: Props) => {
  const { isAdding, isCurrentTask, handleDrag } = useSubtaskContext()
  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId={taskId}>
        {(provided) => (
          <SubtaskListContainer
            {...provided.droppableProps}
            ref={provided.innerRef}
            $marginTop={subtasks.length !== 0 || (isAdding && isCurrentTask(taskId))}
            data-testid="subtask-list"
          >
            {subtasks.map((subtask, index) => (
              <Draggable
                key={subtask.id}
                index={index}
                draggableId={subtask.id}
                isDragDisabled={isMobile}
              >
                {(provided) => <Subtask key={subtask.id} {...subtask} {...provided} />}
              </Draggable>
            ))}
            {isAdding && isCurrentTask(taskId) && <SubtaskForm taskId={taskId} />}
            {provided.placeholder}
          </SubtaskListContainer>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default SubtaskList

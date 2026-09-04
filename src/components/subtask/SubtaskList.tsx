import { isMobile } from 'react-device-detect'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { useRef } from 'react'
import { useSubtaskContext } from '@/hooks/useSubtaskContext'
import { useUpdateEffect } from '@/hooks/useUpdateEffect'
import { scrollToBottom } from '@/utils'
import { Subtask as SubtaskType } from '@/types/subtask'
import { SubtaskListContainer } from './styles'
import Subtask from './Subtask'
import SubtaskForm from './SubtaskForm'

type Props = {
  subtasks: SubtaskType[]
  taskId: string
}

const SubtaskList = ({ subtasks, taskId }: Props) => {
  const subtaskListRef = useRef<HTMLUListElement>(null)
  const { isAdding, isCurrentTask, handleDrag } = useSubtaskContext()

  useUpdateEffect(() => {
    if (isCurrentTask(taskId)) {
      scrollToBottom(subtaskListRef.current)
    }
  }, [isAdding])
  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId={taskId}>
        {(provided) => (
          <SubtaskListContainer
            {...provided.droppableProps}
            ref={(node) => {
              provided.innerRef(node)
              subtaskListRef.current = node
            }}
            data-testid="subtask-list"
          >
            {subtasks.map((subtask, index) => (
              <Draggable
                key={subtask.id}
                index={index}
                draggableId={subtask.id}
                isDragDisabled={isMobile}
              >
                {(provided) => (
                  <Subtask
                    key={subtask.id}
                    subtaskListRef={subtaskListRef}
                    {...subtask}
                    {...provided}
                  />
                )}
              </Draggable>
            ))}
            {isAdding && isCurrentTask(taskId) && (
              <SubtaskForm taskId={taskId} subtaskListRef={subtaskListRef} />
            )}
            {provided.placeholder}
          </SubtaskListContainer>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default SubtaskList

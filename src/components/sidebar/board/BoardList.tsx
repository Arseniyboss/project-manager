import { Droppable, Draggable } from '@hello-pangea/dnd'
import { useBoardContext } from '@/hooks/useBoardContext'
import Board from './Board'
import BoardForm from './BoardForm'

const BoardList = () => {
  const { boards, isAdding } = useBoardContext()
  return (
    <Droppable droppableId="board-list">
      {(provided) => (
        <ul {...provided.droppableProps} ref={provided.innerRef} data-testid="board-list">
          {boards.map((board, index) => (
            <Draggable key={board.id} index={index} draggableId={board.id}>
              {(provided, snapshot) => (
                <Board key={board.id} {...board} {...provided} {...snapshot} />
              )}
            </Draggable>
          ))}
          {isAdding && <BoardForm />}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  )
}

export default BoardList

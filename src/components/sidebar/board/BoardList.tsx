import { Droppable, Draggable } from '@hello-pangea/dnd'
import { useRef } from 'react'
import { useBoardContext } from '@/hooks/useBoardContext'
import { useUpdateEffect } from '@/hooks/useUpdateEffect'
import { scrollToBottom } from '@/utils'
import Board from './Board'
import BoardForm from './BoardForm'

const BoardList = () => {
  const boardListRef = useRef<HTMLUListElement>(null)
  const { boards, isAdding } = useBoardContext()

  useUpdateEffect(() => {
    scrollToBottom(boardListRef.current)
  }, [isAdding])
  return (
    <Droppable droppableId="board-list">
      {(provided) => (
        <ul
          {...provided.droppableProps}
          ref={(node) => {
            provided.innerRef(node)
            boardListRef.current = node
          }}
          data-testid="board-list"
        >
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

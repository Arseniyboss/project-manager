import { FiSidebar } from 'react-icons/fi'
import { DragDropContext } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
import { useSidebarContext } from '@/hooks/useSidebarContext'
import { useTaskContext } from '@/hooks/useTaskContext'
import { useBoardContext } from '@/hooks/useBoardContext'
import {
  BoardSection,
  Header,
  SidebarIconContainer,
  Heading,
  BoardWrapper,
} from './styles'
import BoardColumn from '@/components/board-column/BoardColumn'
import NotFound from '@/pages/NotFound'

type Params = {
  id: string
}

const Board = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarContext()
  const { statuses, handleDrag } = useTaskContext()
  const { getCurrentBoard } = useBoardContext()

  const { id } = useParams() as Params
  const board = getCurrentBoard(id)

  if (!board) {
    return <NotFound />
  }
  return (
    <BoardSection>
      <Header>
        <SidebarIconContainer
          $isSidebarOpen={isSidebarOpen}
          onClick={toggleSidebar}
          aria-label="open sidebar"
          data-testid="open-sidebar-button"
        >
          <FiSidebar className="sidebarIcon" />
        </SidebarIconContainer>
        <Heading>{board.title}</Heading>
      </Header>
      <BoardWrapper>
        <DragDropContext onDragEnd={handleDrag}>
          {statuses.map((status, index) => (
            <BoardColumn key={index} status={status} boardId={id} />
          ))}
        </DragDropContext>
      </BoardWrapper>
    </BoardSection>
  )
}

export default Board

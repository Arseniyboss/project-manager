import { FiSidebar } from 'react-icons/fi'
import { DragDropContext } from '@hello-pangea/dnd'
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

type Props = {
  showAllTasks?: boolean
}

const Board = ({ showAllTasks }: Props) => {
  const { isSidebarOpen, toggleSidebar } = useSidebarContext()
  const { statuses, handleDrag } = useTaskContext()
  const { getCurrentBoard } = useBoardContext()

  const { id } = useParams() as Params
  const board = getCurrentBoard(id)

  if (!showAllTasks && !board) {
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
        <Heading>{showAllTasks ? 'All Tasks' : board!.title}</Heading>
      </Header>
      <BoardWrapper>
        <DragDropContext onDragEnd={handleDrag}>
          {statuses.map((status, index) => (
            <BoardColumn
              key={index}
              status={status}
              boardId={id}
              showAllTasks={showAllTasks}
            />
          ))}
        </DragDropContext>
      </BoardWrapper>
    </BoardSection>
  )
}

export default Board

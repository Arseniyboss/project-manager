import { FiSidebar } from 'react-icons/fi'
import { HiOutlineViewColumns } from 'react-icons/hi2'
import { LuCalendarDays } from 'react-icons/lu'
import { DragDropContext } from '@hello-pangea/dnd'
import { useParams } from 'react-router-dom'
import { useLocalStorage } from '@/hooks/useLocalStorage'
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
import { BoardView } from '@/types/board'
import { Button } from '@/styles'
import NotFound from '@/pages/NotFound'
import BoardColumn from '@/components/board-column/BoardColumn'
import CalendarView from '@/components/calendar/CalendarView'

type Params = {
  id: string
}

type Props = {
  showAllTasks?: boolean
}

const Board = ({ showAllTasks }: Props) => {
  const [boardView, setBoardView] = useLocalStorage<BoardView>('boardView', 'kanban')

  const { isSidebarOpen, toggleSidebar } = useSidebarContext()
  const { statuses, handleDrag, filterCalendarTasks } = useTaskContext()
  const { getCurrentBoard } = useBoardContext()

  const { id: boardId } = useParams() as Params
  const board = getCurrentBoard(boardId)

  const calendarTasks = showAllTasks
    ? filterCalendarTasks()
    : filterCalendarTasks(boardId)

  const nextView = boardView === 'kanban' ? 'calendar' : 'kanban'

  const toggleBoardView = () => {
    setBoardView(nextView)
  }

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
        <Button onClick={toggleBoardView} aria-label={`show ${nextView} view`}>
          {boardView === 'calendar' && <HiOutlineViewColumns size={25} />}
          {boardView === 'kanban' && <LuCalendarDays size={25} />}
        </Button>
      </Header>
      {boardView === 'kanban' && (
        <BoardWrapper>
          <DragDropContext onDragEnd={handleDrag}>
            {statuses.map((status, index) => (
              <BoardColumn
                key={index}
                status={status}
                boardId={boardId}
                showAllTasks={showAllTasks}
              />
            ))}
          </DragDropContext>
        </BoardWrapper>
      )}
      {boardView === 'calendar' && <CalendarView tasks={calendarTasks} />}
    </BoardSection>
  )
}

export default Board

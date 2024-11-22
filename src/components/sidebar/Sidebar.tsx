import { DragDropContext } from '@hello-pangea/dnd'
import { FaPlus } from 'react-icons/fa'
import { Button } from '@/styles'
import { SidebarContainer, FlexGroup } from './styles'
import { useTheme } from '@/hooks/useTheme'
import { useBoardContext } from '@/hooks/useBoardContext'
import SidebarIcons from './sidebar-icons/SidebarIcons'
import BoardList from './board/BoardList'

const Sidebar = () => {
  const { themeStyles } = useTheme()
  const { setIsAdding, handleDrag } = useBoardContext()
  return (
    <SidebarContainer $themeStyles={themeStyles}>
      <SidebarIcons />
      <FlexGroup>
        <h2>Boards</h2>
        <Button
          onClick={() => setIsAdding(true)}
          aria-label="add board"
          data-testid="add-board-button"
        >
          <FaPlus size={20} />
        </Button>
      </FlexGroup>
      <DragDropContext onDragEnd={handleDrag}>
        <BoardList />
      </DragDropContext>
    </SidebarContainer>
  )
}

export default Sidebar

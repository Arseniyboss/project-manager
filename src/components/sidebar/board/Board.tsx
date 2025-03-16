import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd'
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { HiOutlineViewColumns } from 'react-icons/hi2'
import { FaTrashAlt } from 'react-icons/fa'
import { useUpdateEffect } from '@/hooks/useUpdateEffect'
import { useTheme } from '@/hooks/useTheme'
import { useBoardContext } from '@/hooks/useBoardContext'
import { useSidebarContext } from '@/hooks/useSidebarContext'
import { BoardType } from '@/types/board'
import { Button } from '@/styles'
import {
  BoardContainer,
  BoardHeader,
  FlexGroup,
  ProgressContainer,
  ProgressBarContainer,
  ProgressBar,
} from './styles'

type Props = BoardType & DraggableProvided & DraggableStateSnapshot

const Board = (props: Props) => {
  const { id, title, isDragging, draggableProps, dragHandleProps, innerRef } = props

  const [board, setBoard] = useState(title)

  const { themeStyles } = useTheme()
  const { getAdjacentBoard, editBoard, deleteBoard, calculateBoardProgress } =
    useBoardContext()
  const { handleLinkClick } = useSidebarContext()

  const navigate = useNavigate()
  const location = useLocation()

  const boardProgress = calculateBoardProgress(id)

  const currentBoardId = location.pathname.split('/').at(-1)
  const isCurrentBoard = currentBoardId === id

  useUpdateEffect(() => {
    const trimmedBoard = board.trim()
    if (!trimmedBoard) return
    editBoard(id, trimmedBoard)
  }, [board])

  const navigateToAdjacentBoard = () => {
    const adjacentBoard = getAdjacentBoard(id)
    navigate(adjacentBoard ? `/board/${adjacentBoard.id}` : '/')
  }

  const handleDelete = () => {
    deleteBoard(id)
    if (!isCurrentBoard) return
    navigateToAdjacentBoard()
  }
  return (
    <BoardContainer
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
      $themeStyles={themeStyles}
      $isCurrentBoard={isCurrentBoard || isDragging}
      data-testid="board"
    >
      <BoardHeader>
        <FlexGroup>
          <Link
            to={`/board/${id}`}
            aria-label={title}
            aria-current={isCurrentBoard && 'page'}
            onClick={handleLinkClick}
          >
            <HiOutlineViewColumns className="sidebarIcon" />
          </Link>
          <input
            value={board}
            onChange={(e) => setBoard(e.target.value)}
            aria-label="edit board input"
            data-testid="edit-board-input"
          />
        </FlexGroup>
        <Button
          onClick={handleDelete}
          aria-label="delete board"
          data-testid="delete-board-button"
        >
          <FaTrashAlt size={19} />
        </Button>
      </BoardHeader>
      <ProgressContainer>
        <ProgressBarContainer>
          <ProgressBar
            role="progressbar"
            aria-live="polite"
            aria-label={`board progress: ${boardProgress}%`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={boardProgress}
            $boardProgress={boardProgress}
          />
        </ProgressBarContainer>
        <p>{boardProgress}%</p>
      </ProgressContainer>
    </BoardContainer>
  )
}

export default Board

import { KeyboardEvent, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import { useBoardContext } from '@/hooks/useBoardContext'
import { HiOutlineViewColumns } from 'react-icons/hi2'
import { FaCircleCheck } from 'react-icons/fa6'
import { Button } from '@/styles'
import { BoardContainer, FlexGroup } from './styles'

const BoardForm = () => {
  const [title, setTitle] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const { themeStyles } = useTheme()
  const { boards, isAdding, setIsAdding, addBoard } = useBoardContext()

  useEffect(() => {
    if (isAdding) {
      inputRef.current?.focus()
    }
  }, [isAdding])

  const handleAddBoard = () => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return
    const boardId = crypto.randomUUID()
    const boardAlreadyExists = boards.find((board) => board.title === trimmedTitle)
    if (boardAlreadyExists) return alert('This board already exists')
    addBoard(boardId, trimmedTitle)
    navigate(`/board/${boardId}`)
    setIsAdding(false)
  }

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    handleAddBoard()
  }
  return (
    <BoardContainer $themeStyles={themeStyles} $isAdding={isAdding}>
      <FlexGroup>
        <HiOutlineViewColumns className="sidebarIcon" />
        <input
          value={title}
          ref={inputRef}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleEnter}
          data-testid="add-board-input"
        />

        <Button
          onClick={handleAddBoard}
          aria-label="add board"
          data-testid="add-board-button"
        >
          <FaCircleCheck size={20} />
        </Button>
      </FlexGroup>
    </BoardContainer>
  )
}

export default BoardForm

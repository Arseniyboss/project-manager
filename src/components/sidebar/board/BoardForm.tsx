import { KeyboardEvent, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import { useBoardContext } from '@/hooks/useBoardContext'
import { HiOutlineViewColumns } from 'react-icons/hi2'
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

  const handleEnter = (e: KeyboardEvent) => {
    const trimmedTitle = title.trim()
    if (e.key !== 'Enter' || !trimmedTitle) return
    const boardId = crypto.randomUUID()
    const boardAlreadyExists = boards.find((board) => board.title === trimmedTitle)
    if (boardAlreadyExists) return alert('This board already exists')
    addBoard(boardId, trimmedTitle)
    navigate(`/board/${boardId}`)
    setIsAdding(false)
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
      </FlexGroup>
    </BoardContainer>
  )
}

export default BoardForm

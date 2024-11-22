import { DropResult } from '@hello-pangea/dnd'
import { ReactNode, createContext, useState } from 'react'
import { BoardContextType, Board } from '@/types/board'
import { useLocalStorage } from '@/hooks/useLocalStorage'

type Props = {
  children: ReactNode
}

export const BoardContext = createContext<BoardContextType | null>(null)

export const BoardContextProvider = ({ children }: Props) => {
  const [boards, setBoards] = useLocalStorage<Board[]>('boards', [])
  const [isAdding, setIsAdding] = useState<boolean>(false)

  const getFilteredBoards = (boardId: string) => {
    return boards.filter((board) => board.id !== boardId)
  }

  const getBoardIndex = (boardId: string) => {
    return boards.findIndex((board) => board.id === boardId)
  }

  const getAdjacentBoard = (currentBoardId: string) => {
    const filteredBoards = getFilteredBoards(currentBoardId)
    const currentBoardIndex = getBoardIndex(currentBoardId)
    const nextBoard = filteredBoards.at(currentBoardIndex)
    const previousBoard = filteredBoards.at(-1)
    return nextBoard || previousBoard
  }

  const getCurrentBoard = (id: string) => {
    return boards.find((board) => board.id === id)
  }

  const addBoard = (id: string, title: string) => {
    setBoards([...boards, { id, title }])
  }

  const deleteBoard = (id: string) => {
    const filteredBoards = getFilteredBoards(id)
    setBoards(filteredBoards)
  }

  const editBoard = (id: string, title: string) => {
    const updatedBoards = boards.map((board) => {
      return board.id === id ? { ...board, title } : board
    })
    setBoards(updatedBoards)
  }

  const reorderBoards = (draggableBoardIndex: number, newDraggableBoardIndex: number) => {
    const reorderedBoards = [...boards]
    // remove the board from the old position
    const [draggableTask] = reorderedBoards.splice(draggableBoardIndex, 1)
    // insert the board into the new position
    reorderedBoards.splice(newDraggableBoardIndex, 0, draggableTask)
    return reorderedBoards
  }

  const handleDrag = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    const draggableBoardIndex = source.index
    const newDraggableBoardIndex = destination.index

    if (draggableBoardIndex === newDraggableBoardIndex) return

    const reorderedBoards = reorderBoards(draggableBoardIndex, newDraggableBoardIndex)
    setBoards(reorderedBoards)
  }

  const value = {
    isAdding,
    boards,
    getCurrentBoard,
    getAdjacentBoard,
    setIsAdding,
    addBoard,
    deleteBoard,
    editBoard,
    handleDrag,
  }

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}

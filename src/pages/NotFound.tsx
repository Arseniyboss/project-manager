import { Navigate } from 'react-router-dom'
import { useBoardContext } from '@/hooks/useBoardContext'

const NotFound = () => {
  const { allTasksBoard } = useBoardContext()
  return <Navigate to={`/board/${allTasksBoard.id}`} replace />
}

export default NotFound

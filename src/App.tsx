import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import { useSidebarContext } from './hooks/useSidebarContext'
import { Container } from './styles'
import GlobalStyle from './GlobalStyle'
import Sidebar from './components/sidebar/Sidebar'
import Board from './pages/board/Board'
import NotFound from './pages/NotFound'

const App = () => {
  const { themeStyles } = useTheme()
  const { isSidebarOpen } = useSidebarContext()
  return (
    <Router>
      <GlobalStyle themeStyles={themeStyles} />
      <Container>
        {isSidebarOpen && <Sidebar />}
        <Routes>
          <Route path="/" element={<Board showAllTasks />} />
          <Route path="/board/:id" element={<Board />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App

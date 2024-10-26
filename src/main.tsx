import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeContextProvider } from './contexts/ThemeContext'
import { BoardContextProvider } from './contexts/BoardContext.tsx'
import { TaskContextProvider } from './contexts/TaskContext'
import { SidebarContextProvider } from './contexts/SidebarContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeContextProvider>
    <BoardContextProvider>
      <TaskContextProvider>
        <SidebarContextProvider>
          <App />
        </SidebarContextProvider>
      </TaskContextProvider>
    </BoardContextProvider>
  </ThemeContextProvider>
)

import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeContextProvider } from './contexts/ThemeContext'
import { BoardContextProvider } from './contexts/BoardContext.tsx'
import { TaskContextProvider } from './contexts/TaskContext'
import { SubtaskContextProvider } from './contexts/SubtaskContext'
import { SidebarContextProvider } from './contexts/SidebarContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeContextProvider>
    <SubtaskContextProvider>
      <TaskContextProvider>
        <BoardContextProvider>
          <SidebarContextProvider>
            <App />
          </SidebarContextProvider>
        </BoardContextProvider>
      </TaskContextProvider>
    </SubtaskContextProvider>
  </ThemeContextProvider>
)

import { dateFnsLocalizer } from 'react-big-calendar'
import { format, getDay, startOfWeek } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import { CalendarTask } from './types/task'

export const MOBILE_SIDEBAR_BREAKPOINT = 768

export const isMobileViewport = () => {
  return window.innerWidth <= MOBILE_SIDEBAR_BREAKPOINT
}

export const parseDueDate = (dueDate: string) => {
  const [day, month, year] = dueDate.split('.')
  return new Date(`${year}-${month}-${day}`)
}

export const formatDueDate = (dueDate: Date) => {
  return dueDate.toLocaleDateString('ru-RU')
}

export const getEvents = (tasks: CalendarTask[]) => {
  return tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: parseDueDate(task.dueDate),
    end: parseDueDate(task.dueDate),
  }))
}

export const dateLocalizer = dateFnsLocalizer({
  locales: { 'en-US': enUS },
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  format,
  getDay,
})

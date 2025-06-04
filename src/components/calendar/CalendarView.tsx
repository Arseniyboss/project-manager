import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar } from 'react-big-calendar'
import { CalendarTask } from '@/types/task'
import { useTheme } from '@/hooks/useTheme'
import { getEvents, dateLocalizer } from '@/utils'
import { CalendarWrapper } from './styles'
import CalendarHeader from './CalendarHeader'

type Props = {
  tasks: CalendarTask[]
}

const CalendarView = ({ tasks }: Props) => {
  const { themeStyles } = useTheme()
  const events = getEvents(tasks)
  return (
    <CalendarWrapper $themeStyles={themeStyles}>
      <Calendar
        popup
        localizer={dateLocalizer}
        events={events}
        components={{ toolbar: CalendarHeader }}
      />
    </CalendarWrapper>
  )
}

export default CalendarView

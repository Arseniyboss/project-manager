import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import { useState } from 'react'
import { LuCalendarDays } from 'react-icons/lu'
import { useTheme } from '@/hooks/useTheme'
import { useTaskContext } from '@/hooks/useTaskContext'
import { parseDueDate, formatDueDate } from '@/utils'
import { DatePickerWrapper, Tag } from './styles'
import { Button } from '@/styles'

type Props = {
  taskId: string
  dueDate?: string
}

const DueDate = ({ taskId, dueDate }: Props) => {
  const initialDueDate = dueDate ? parseDueDate(dueDate) : null
  const [selectedDueDate, setSelectedDueDate] = useState(initialDueDate)

  const { themeStyles } = useTheme()
  const { addDueDate, setIsDatePickerOpen } = useTaskContext()

  const handleChange = (dueDate: Date | null) => {
    if (!dueDate) return
    setSelectedDueDate(dueDate)
    const formattedDueDate = formatDueDate(dueDate)
    addDueDate(taskId, formattedDueDate)
  }
  return (
    <DatePickerWrapper $themeStyles={themeStyles}>
      <DatePicker
        selected={selectedDueDate}
        onChange={handleChange}
        onCalendarOpen={() => setIsDatePickerOpen(true)}
        onCalendarClose={() => setIsDatePickerOpen(false)}
        popperPlacement="bottom-start"
        calendarStartDay={1}
        customInput={
          <Button data-testid="show-datepicker-button" aria-label="set due date">
            {dueDate ? (
              <Tag $themeStyles={themeStyles} data-testid="due-date">
                {dueDate}
              </Tag>
            ) : (
              <LuCalendarDays size={19} />
            )}
          </Button>
        }
      />
    </DatePickerWrapper>
  )
}

export default DueDate

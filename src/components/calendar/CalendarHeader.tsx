import { NavigateAction } from 'react-big-calendar'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { Button } from '@/styles'
import { CalendarHeaderWrapper } from './styles'
import { useTheme } from '@/hooks/useTheme'

type Props = {
  label: string
  onNavigate: (navigate: NavigateAction) => void
}

const CalendarHeader = ({ label, onNavigate }: Props) => {
  const { themeStyles } = useTheme()
  return (
    <CalendarHeaderWrapper $themeStyles={themeStyles}>
      <Button onClick={() => onNavigate('PREV')}>
        <IoChevronBack size={20} />
      </Button>
      <span>{label}</span>
      <Button onClick={() => onNavigate('NEXT')}>
        <IoChevronForward size={20} />
      </Button>
    </CalendarHeaderWrapper>
  )
}

export default CalendarHeader

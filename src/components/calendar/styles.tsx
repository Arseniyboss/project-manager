import styled from 'styled-components'
import { ThemeStyles } from '@/types/theme'

type Props = {
  $themeStyles: ThemeStyles
}

interface CalendarWrapperProps extends Props {
  $isAppleDevice: boolean
}

export const CalendarWrapper = styled.div<CalendarWrapperProps>`
  height: 100vh;

  .rbc-month-header,
  .rbc-month-view,
  .rbc-day-bg {
    border-left: ${({ $isAppleDevice }) => $isAppleDevice && '0.5px solid #ddd'};
    border-right: ${({ $isAppleDevice }) => $isAppleDevice && '0.5px solid #ddd'};
  }

  .rbc-header {
    background: ${({ $themeStyles }) => $themeStyles.calendarHeaderColor};
    padding: 0.5rem;
  }

  .rbc-event-content {
    font-size: 0.9rem;
  }

  .rbc-day-bg {
    background: ${({ $themeStyles }) => $themeStyles.calendarDayColor};
  }

  .rbc-date-cell,
  .rbc-event {
    pointer-events: none;
  }

  .rbc-row-segment {
    padding: 0.1rem 0.25rem;
  }

  .rbc-row-bg {
    right: 0;
  }
`

export const CalendarHeaderWrapper = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.3rem;

  button {
    background: ${({ $themeStyles }) => $themeStyles.calendarArrowBackground};
    border-radius: 0.25rem;
    padding: 0.2rem;
  }
`

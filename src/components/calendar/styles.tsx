import styled from 'styled-components'
import { ThemeStyles } from '@/types/theme'

type Props = {
  $themeStyles: ThemeStyles
}

export const CalendarWrapper = styled.div<Props>`
  height: 100vh;

  * {
    overflow-y: auto;
  }

  .rbc-month-header,
  .rbc-month-view,
  .rbc-day-bg {
    border-left: 0.5px solid #ddd;
    border-right: 0.5px solid #ddd;
  }

  .rbc-header {
    background: ${({ $themeStyles }) => $themeStyles.calendarHeaderColor};
    padding: 0.5rem;
  }

  .rbc-event-content {
    white-space: normal;
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

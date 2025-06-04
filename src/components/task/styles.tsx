import styled from 'styled-components'
import { ThemeStyles } from '@/types/theme'

type Props = {
  $themeStyles: ThemeStyles
}

export const Card = styled.li<Props>`
  background: ${({ $themeStyles }) => $themeStyles.taskCardColor};
  list-style-type: none;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 0.75rem;

  textarea {
    width: 80%;
    resize: none;
  }
`

export const CardBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
`

export const CardFooter = styled.div`
  display: flex;
  gap: 0.7rem;
`

export const IconGroup = styled.div`
  display: flex;
  gap: inherit;
`

export const Tag = styled.span<Props>`
  background: #eee;
  color: #444;
  display: flex;
  white-space: nowrap;
  overflow-y: auto;
  max-width: 100%;
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const DatePickerWrapper = styled.div`
  cursor: default;

  button:focus {
    outline: none;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__navigation-icon::before {
    border-color: grey;
  }

  .react-datepicker__day--outside-month {
    opacity: 0.3;
    pointer-events: none;

    &:hover {
      background: none;
    }
  }

  .react-datepicker__day--selected {
    background: black;

    &:hover {
      background: black;
    }

    &:focus {
      outline: 1px solid #aaa;
    }
  }

  .react-datepicker__day--keyboard-selected {
    background: none;

    &:focus-visible {
      outline: 1px solid #aaa;
    }

    &:hover {
      background: #f0f0f0;
    }
  }

  .react-datepicker__day--today {
    font-weight: normal;
    border-radius: 0.3rem;
  }

  .react-datepicker__day--today:not(.react-datepicker__day--selected) {
    background: #f0f0f0;
  }
`

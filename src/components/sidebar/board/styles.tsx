import styled from 'styled-components'
import { ThemeStyles } from '@/types/theme'

type Props = {
  $isCurrentBoard?: boolean
  $isAdding?: boolean
  $themeStyles: ThemeStyles
}

export const BoardContainer = styled.li<Props>`
  display: flex;
  gap: 0.8rem;
  padding: 0.9rem;
  margin-bottom: 0.2rem;
  border-radius: 0.5rem;
  width: 100%;
  background: ${({ $isCurrentBoard, $themeStyles }) => {
    return $isCurrentBoard && $themeStyles.currentBoardColor
  }};

  &:hover {
    background: ${({ $isAdding, $themeStyles }) => {
      return !$isAdding && $themeStyles.currentBoardColor
    }};
    button:last-child {
      visibility: visible;
    }
  }

  button:last-child {
    visibility: ${({ $isCurrentBoard }) => !$isCurrentBoard && 'hidden'};
  }
`

export const FlexGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  width: 100%;

  input {
    flex: 1;
  }
`

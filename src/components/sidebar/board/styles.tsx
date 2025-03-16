import styled from 'styled-components'
import { ThemeStyles } from '@/types/theme'

type BoardContainerProps = {
  $isCurrentBoard?: boolean
  $isAdding?: boolean
  $themeStyles: ThemeStyles
}

type ProgressBarProps = {
  $boardProgress: number
}

export const BoardContainer = styled.li<BoardContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border-radius: 0.5rem;
  width: 100%;
  box-shadow: 0 0 0.25rem ${({ $themeStyles }) => $themeStyles.currentBoardShadowColor};
  background: ${({ $isCurrentBoard, $themeStyles }) => {
    return $isCurrentBoard && $themeStyles.currentBoardColor
  }};

  &:hover {
    background: ${({ $isAdding, $themeStyles }) => {
      return !$isAdding && $themeStyles.currentBoardColor
    }};
  }
`

export const BoardHeader = styled.div`
  display: flex;
  gap: 0.8rem;
`

export const FlexGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  width: 100%;

  input {
    flex: 1;
  }
`

export const ProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;

  p {
    min-width: 35px;
    text-align: end;
  }
`

export const ProgressBarContainer = styled.div`
  background: #c5c5c5;
  width: 100%;
  height: 8px;
  border-radius: 0.25rem;
`

export const ProgressBar = styled.div<ProgressBarProps>`
  width: ${({ $boardProgress }) => $boardProgress}%;
  background: #3699f5;
  height: 100%;
  border-radius: inherit;
  transition: 0.3s ease-in-out;
`

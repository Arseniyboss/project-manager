import styled from 'styled-components'
import { Card } from '@/components/task/styles'

type SubtaskCardProps = {
  $noMarginBottom?: boolean
}

type SubtaskListContainerProps = {
  $marginTop: boolean
}

export const SubtaskCard = styled(Card)<SubtaskCardProps>`
  background: ${({ $themeStyles }) => $themeStyles.subtaskCardColor};
  margin-bottom: ${({ $noMarginBottom }) => $noMarginBottom && 0};
`

export const SubtaskListContainer = styled.ul<SubtaskListContainerProps>`
  margin-top: ${({ $marginTop }) => $marginTop && '0.8rem'};
  max-height: 315px;
  overflow-y: auto;
`

export const CheckboxWrapper = styled.div`
  display: flex;
  position: relative;

  input {
    appearance: none;
    border: 2px solid lightgrey;
    background: white;
    width: 18px;
    height: 18px;
    border-radius: 50%;

    &:checked {
      background: #7d7d88;
      border: none;
    }
  }
`

export const CheckmarkContainer = styled.label`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 0.6rem;
`

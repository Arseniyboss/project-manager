import styled from 'styled-components'
import { ThemeStyles } from '@/types/theme'

type Props = {
  $themeStyles: ThemeStyles
}

export const Card = styled.li<Props>`
  background: ${({ $themeStyles }) => $themeStyles.cardColor};
  list-style-type: none;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 0.75rem;

  textarea {
    width: 100%;
    resize: none;
  }
`

export const CardBody = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const BoardTag = styled.span<Props>`
  background: #eee;
  color: #444;
  align-self: start;
  white-space: nowrap;
  overflow-y: auto;
  max-width: 100%;
  padding: 0.3rem 0.8rem;
  margin-top: 0.6rem;
  border-radius: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
`

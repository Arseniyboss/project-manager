import styled from 'styled-components'
import { ThemeStyles } from '@/types/theme'

type Props = {
  $themeStyles: ThemeStyles
}

export const Card = styled.li<Props>`
  background: ${({ $themeStyles }) => $themeStyles.cardColor};
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 0.75rem;

  textarea {
    width: 90%;
    resize: none;
  }
`

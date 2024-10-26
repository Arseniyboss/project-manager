import styled from 'styled-components'
import { Button } from '@/styles'
import { ThemeStyles } from '@/types/theme'

type Props = {
  $themeStyles: ThemeStyles
}

export const IconGroup = styled.div`
  display: flex;
  gap: 0.8rem;
`

export const UserAvatar = styled(Button)<Props>`
  background: ${({ $themeStyles }) => $themeStyles.color};
  color: ${({ $themeStyles }) => $themeStyles.cardColor};
  padding: 0.57rem;
  border-radius: 50%;
  cursor: pointer;
`

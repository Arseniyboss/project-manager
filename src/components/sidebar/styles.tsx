import styled from 'styled-components'
import { ThemeStyles } from '@/types/theme'
import { MOBILE_SIDEBAR_BREAKPOINT } from '@/utils'

type Props = {
  $themeStyles: ThemeStyles
}

export const SidebarContainer = styled.aside<Props>`
  background: ${({ $themeStyles }) => $themeStyles.sidebarColor};
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.5rem;
  height: 100dvh;
  width: 340px;

  @media screen and (max-width: ${MOBILE_SIDEBAR_BREAKPOINT}px) {
    position: absolute;
    width: 100vw;
  }
`

export const FlexGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:first-of-type {
    margin: 0.4rem 0;
  }
`

export const IconGroup = styled.div`
  display: flex;
  gap: 0.8rem;
`

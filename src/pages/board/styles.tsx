import styled from 'styled-components'
import { Button } from '@/styles'

type Props = {
  $isSidebarOpen: boolean
}

export const BoardSection = styled.main`
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100dvh;
  padding: 1.5rem;
  gap: 1.5rem;
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const SidebarIconContainer = styled(Button)<Props>`
  position: absolute;
  visibility: ${({ $isSidebarOpen }) => $isSidebarOpen && 'hidden'};
`

export const Heading = styled.h1`
  line-height: 1.15;
  max-width: 75%;
  overflow-x: auto;
  white-space: nowrap;
  align-self: center;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const BoardWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  gap: 1rem;
  height: 100%;
  overflow-x: auto;
`

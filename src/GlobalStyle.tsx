import { createGlobalStyle } from 'styled-components'
import { ThemeStyles } from './types/theme'

type Props = {
  themeStyles: ThemeStyles
}

const GlobalStyle = createGlobalStyle<Props>`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    overscroll-behavior: none;
    font-family: Arial, Helvetica, sans-serif;
    background: ${({ themeStyles }) => themeStyles.background};
    color: ${({ themeStyles }) => themeStyles.color};
  }

  a {
    text-decoration: none;
    color: inherit;
    display: inherit;
  }

  ul {
    height: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  input, textarea {
    border: none;
    outline: none;
    color: inherit;
    background: inherit;
    font-size: inherit;
    font-family: inherit;
    overflow-y: hidden;
    line-height: 1.17;
  }

  .sidebarIcon {
    font-size: 1.5rem;
  }
`

export default GlobalStyle

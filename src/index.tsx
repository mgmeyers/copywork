import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import './index.css'
import '@csstools/normalize.css'
import { Theme, ThemeProvider } from 'components/ThemeProvider'
import { css, Global } from '@emotion/core'
import { useTheme } from 'emotion-theming'

function GlobalStyles() {
    const theme = useTheme<Theme>()
    return (
        <Global styles={css`
            html, body {
                background: ${theme.getForeground(100)}
            }
        `} />
    )
}

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <GlobalStyles />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

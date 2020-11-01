import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import './index.css'
import './fonts.css'
import '@csstools/normalize.css'
import { ThemeProvider } from 'components/ThemeProvider'

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './_style.scss'
import { createTheme, ThemeProvider } from '@mui/material'
//fonts
import '@fontsource/roboto'
import '@fontsource/ibm-plex-mono'
import App from './app/App'
import { Provider } from 'react-redux'
import store from './app/store'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d2d52',
    },
    text: {
      primary: '#0d2d52',
    }
  },
  typography: {
    fontFamily: [
      'IBM Plex Mono',
      'sans-serif'
    ].join(','),
  }
})

ReactDOM.createRoot(document.getElementById('br-root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)

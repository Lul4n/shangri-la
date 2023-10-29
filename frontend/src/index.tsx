import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {createTheme, ThemeProvider} from "@mui/material";
import { amber, cyan} from "@mui/material/colors";
import { deDE } from '@mui/material/locale';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: amber[600]
        },
        secondary: {
            main: cyan[100],
        }
    },
}, deDE);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
  </React.StrictMode>,
)

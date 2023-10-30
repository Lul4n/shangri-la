import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ThemeProvider} from "@mui/material";
import './I18N';
import {shangriLaTheme} from "./Theme.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider theme={shangriLaTheme}>
          <Suspense fallback={<div>Loading...</div>}>
              <App />
          </Suspense>
      </ThemeProvider>
  </React.StrictMode>,
)

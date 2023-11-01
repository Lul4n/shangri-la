import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {CssBaseline, ThemeProvider} from "@mui/material";
import './I18N';
import {shangriLaTheme} from "./Theme.ts";
import { AuthProvider } from "react-oidc-context";
import Loading from "./Loading.tsx";
import {oidcConfig} from "./OIDC.ts";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <CssBaseline />
      <ThemeProvider theme={shangriLaTheme}>
          <AuthProvider {...oidcConfig()}>
              <Suspense fallback={<Loading />}>
                  <App />
              </Suspense>
          </AuthProvider>
      </ThemeProvider>
  </React.StrictMode>,
)

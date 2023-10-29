import {BrowserRouter as Router} from 'react-router-dom'
import {AppBar, Container, CssBaseline, Grid, Toolbar, Typography, Button} from "@mui/material";
import {RocketLaunchTwoTone as RocketLaunchTwoToneIcon} from "@mui/icons-material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {SxContainer} from "./Styles.tsx";



function App() {
  return (
    <Router>
      <>
        <CssBaseline />
        <header>
          <AppBar position="relative">
            <nav>
              <Toolbar>
                <RocketLaunchTwoToneIcon />
                <Typography variant="h5">Shangri-La - The second Sunrise</Typography>
              </Toolbar>
            </nav>
          </AppBar>
        </header>
        <main>
          <div>
            <Container maxWidth="md" sx={SxContainer}>
              <Typography variant="h2" align="center" color="textPrimary" gutterBottom>Welcome!</Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Als mutiger Entdecker und Pionier ist es Ihre Aufgabe, unbekannte Sternensysteme zu durchstreifen, verborgene Geheimnisse aufzudecken und neue Welten zu besiedeln.

                Werden Sie der Architekt einer neuen Zivilisation sein, die im Einklang mit den Sternen lebt? Das Schicksal von Shangri-La liegt in Ihren Händen.

                Das Abenteuer beginnt jetzt!
              </Typography>
              <div>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button variant="contained" color="primary">Create Account</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="secondary">Login</Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
        </main>
      </>
    </Router>
  )
}

export default App
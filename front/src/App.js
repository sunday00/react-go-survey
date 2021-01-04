import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import pink from '@material-ui/core/colors/pink';
import indigo from '@material-ui/core/colors/indigo';
import grey from '@material-ui/core/colors/grey';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import Header from './components/common/Header';
import Home from './components/Home';
import Register from './components/auth/Register';
import AuthCallBack from './components/auth/AuthCallBack';

library.add(fas, fab, far);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[300],
    },
    secondary: {
      main: pink[300],
    },
    gray: grey,
  },
});

const useStyles = makeStyles((theme) => ({
  main: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Container className={classes.main} maxWidth={false}>
            <Header />
            <Route component={Home} path="/" exact></Route>
            {/* <Route component={LoginPage} path="/login" /> */}
            <Route component={Register} path="/register" />
            <Route
              component={AuthCallBack}
              path="/auth/:vendor/callback/:action"
            />
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

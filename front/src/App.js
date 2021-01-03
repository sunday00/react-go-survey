import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import pink from '@material-ui/core/colors/pink';
import indigo from '@material-ui/core/colors/indigo';
import grey from '@material-ui/core/colors/grey';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Header from './components/common/Header';
import Home from './components/Home';
import Register from './components/auth/Register';

library.add(fas);

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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Container style={{ padding: 0 }} maxWidth={false}>
            <Header />
            <Route component={Home} path="/" exact></Route>
            {/* <Route component={LoginPage} path="/login" /> */}
            <Route component={Register} path="/register" />
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

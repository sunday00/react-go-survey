import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

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

import store from './modules/index';

import Header from './components/common/Header';
import Home from './components/Home';
import ChooseVendor from './components/auth/ChooseVendor';
import AuthGoogleCallBackContainer from './components/auth/AuthGoogleCallBackContainer';
import AuthKakaoCallBackContainer from './components/auth/AuthKakaoCallBackContainer';
import AuthGoogleSigninCallBack from './components/auth/AuthGoogleSigninCallBack';
import AuthKakaoSigninCallBack from './components/auth/AuthKakaoSigninCallBack';

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
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Container className={classes.main} maxWidth={false}>
              <Header />
              <Route component={Home} path="/" exact></Route>
              {/* <Route component={LoginPage} path="/login" /> */}
              <Route
                render={() => <ChooseVendor mode="register" />}
                path="/register"
              />
              <Route
                render={() => <ChooseVendor mode="signin" />}
                path="/signin"
              />
              <Route
                path="/auth/google/callback/register"
                render={() => <AuthGoogleCallBackContainer vendor="google" />}
              />
              <Route
                path="/auth/kakao/callback/register"
                render={() => <AuthKakaoCallBackContainer vendor="kakao" />}
              />
              <Route
                path="/auth/google/callback/signin"
                render={() => <AuthGoogleSigninCallBack vendor="google" />}
              />
              <Route
                path="/auth/kakao/callback/signin"
                render={() => <AuthKakaoSigninCallBack vendor="kakao" />}
              />
            </Container>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

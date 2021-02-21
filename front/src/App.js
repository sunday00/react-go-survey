import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { pink, indigo, grey, blue, red } from '@material-ui/core/colors';

import store from './modules/index';
import Header from './components/common/Header';
import ChooseVendor from './components/auth/ChooseVendor';
import AuthGoogleCallBackContainer from './components/auth/AuthGoogleCallBackContainer';
import AuthKakaoCallBackContainer from './components/auth/AuthKakaoCallBackContainer';
import AuthGoogleSigninCallBack from './components/auth/AuthGoogleSigninCallBack';
import AuthKakaoSigninCallBack from './components/auth/AuthKakaoSigninCallBack';
import MainWrapper from './components/MainWrapper';

library.add(fas, fab, far);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[300],
      superLight: indigo[100],
    },
    secondary: {
      main: pink[300],
    },
    danger: {
      main: red[600],
    },
    gray: grey,
    confirm: {
      light: blue[100],
      main: blue[300],
      dark: blue[500],
    },
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
              {
                //auth
                <>
                  <Route render={() => <ChooseVendor mode="register" />} path="/register" />
                  <Route render={() => <ChooseVendor mode="signin" />} path="/signin" />
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
                </>
              }
              <Route render={() => <MainWrapper />} path="/" exact />
              <Route render={() => <MainWrapper />} path={['/survey/:mode']} />
              <Route render={() => <MainWrapper />} path="/info" />
            </Container>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Copyright from './Copyright';
import useAuthStyle from '../../lib/styles/authStyle';

const ChooseVendor = ({ mode }) => {
  const classes = useAuthStyle();

  const handleGoogleButton = () => {
    //  TODO:: 이미 로그인 되어 있는 지 확인 (client 에서 로긴 cookie)
    // TODO:: 로그인 하면 로그인 토큰 내려주고
    // TODO:: /

    if (true) {
      axios
        .get(`/auth/google/${mode}`, {
          withCredentials: true,
        })
        .then((res) => {
          window.location = res.data;
        });
    }
  };

  const handleKakaoButton = () => {
    //  TODO:: 이미 로그인 되어 있는 지 확인 (client 에서 로긴 cookie)
    // TODO:: 로그인 하면 로그인 토큰 내려주고
    // TODO:: /

    if (true) {
      axios
        .get(`/auth/kakao/${mode}`, {
          withCredentials: true,
        })
        .then((res) => {
          window.location = res.data;
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.main}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {mode.toUpperCase()}
        </Typography>
        <Button
          type="button"
          fullWidth
          variant="contained"
          className={classes.googleBtn}
          onClick={handleGoogleButton}
        >
          <FontAwesomeIcon
            icon={['fab', 'google']}
            style={{ marginRight: '0.5rem' }}
          />
          with Google
        </Button>
        <Button
          type="button"
          fullWidth
          variant="contained"
          className={classes.kakaoBtn}
          onClick={handleKakaoButton}
        >
          <FontAwesomeIcon
            icon={['fas', 'comment']}
            style={{ marginRight: '0.5rem' }}
          />
          with Kakao
        </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default ChooseVendor;

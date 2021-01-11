import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';

import { makeStyles } from '@material-ui/core';

import {
  setSigned,
  setUserProfile,
  setUserPhoto,
  setUserSubInfo,
} from '../../modules/auth';
import { useOpenToggle } from '../../lib/hooks/useOpenToggle';
import BeforSignButtons from './BeforSignButtons';
import AfterSignButtons from './AfterSignButtons';

const useStyles = makeStyles((theme) => {
  return {
    list: {
      position: 'absolute',
      right: '1rem',
      padding: '0.4rem 0.8rem',
      border: '1px solid',
      borderColor: theme.palette.secondary.light,
      backgroundColor: theme.palette.gray[300],
      borderRadius: '0.5rem',
      color: theme.palette.grey[700],
      boxSizing: 'border-box',
    },
    button: {
      border: '1px solid',
      borderColor: theme.palette.grey[400],
      backgroundColor: theme.palette.gray[100],
      textAlign: 'center',
      borderRadius: '0.3rem',
      margin: '0.4rem auto',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  };
});

const AuthDropdown = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSigned, photo } = useSelector((state) => state.auth);
  const { ref, buttonRef, open, setOpen } = useOpenToggle(false);
  // TODO:: useSelector auth.isSigned, if signed then replace
  // make modify userInfo, logout (just request cookie del post)

  useEffect(() => {
    axios.post('/auth/check').then((res) => {
      if (res.data) {
        dispatch(setSigned(true));
        dispatch(setUserProfile(res.data.User));
        dispatch(setUserPhoto(res.data.Photo));
        dispatch(setUserSubInfo(res.data.SubInfo));
      }
    });
  }, [dispatch]);

  const handleOnClick = useCallback(
    (linkTo) => {
      setOpen(false);

      if (linkTo === '/signout') {
        axios.post('/auth/signout').then((res) => {
          dispatch(setSigned(false));
          dispatch(setUserProfile({}));
          dispatch(setUserPhoto(''));
          dispatch(setUserSubInfo({}));
          return history.push('/');
        });
      }

      return history.push(linkTo);
    },
    [history, setOpen, dispatch],
  );

  const onOpen = (e) => {
    setOpen(!open);
  };

  return (
    <>
      <Button color="secondary" onClick={onOpen} ref={buttonRef}>
        {!isSigned && <AccountCircle />}
        {isSigned && <Avatar className={classes.avatar} src={photo}></Avatar>}
      </Button>

      {open && (
        <List
          component="nav"
          aria-label="account relative"
          className={classes.list}
          ref={ref}
        >
          {!isSigned && (
            <BeforSignButtons
              classesProp={classes}
              handleOnClick={handleOnClick}
            />
          )}
          {isSigned && (
            <AfterSignButtons
              classesProp={classes}
              handleOnClick={handleOnClick}
            />
          )}
        </List>
      )}
    </>
  );
};

export default AuthDropdown;

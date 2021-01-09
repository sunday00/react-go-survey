import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setSigned } from '../../modules/auth';
import { useOpenToggle } from '../../lib/hooks/useOpenToggle';

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
  const { isSigned, photo } = useSelector((state) => state.auth);
  const { ref, buttonRef, open, setOpen } = useOpenToggle(false);
  // TODO:: useSelector auth.isSigned, if signed then replace
  // make modify userInfo, logout (just request cookie del post)

  const handleOnClick = useCallback(
    (linkTo) => {
      setOpen(false);
      return history.push(linkTo);
    },
    [history, setOpen],
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
          <ListItem
            button
            className={classes.button}
            onClick={() => handleOnClick('/login')}
          >
            <ListItemIcon style={{ minWidth: 0 }}>
              <FontAwesomeIcon
                icon={['fas', 'sign-in-alt']}
                style={{ marginRight: '0.5rem' }}
              />
            </ListItemIcon>
            <ListItemText primary="Sign In" />
          </ListItem>
          <ListItem
            button
            className={classes.button}
            onClick={() => handleOnClick('/register')}
          >
            <ListItemIcon style={{ minWidth: 0 }}>
              <FontAwesomeIcon
                icon={['fas', 'user-plus']}
                style={{ marginRight: '0.5rem' }}
              />
            </ListItemIcon>
            <ListItemText primary="Register" />
          </ListItem>
        </List>
      )}
    </>
  );
};

export default AuthDropdown;

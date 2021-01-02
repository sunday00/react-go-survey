import React from 'react';

import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core';

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
  };
});

const AuthDropdown = () => {
  const classes = useStyles();

  const { ref, buttonRef, open, setOpen } = useOpenToggle(false);

  const onOpen = (e) => {
    setOpen(!open);
  };

  return (
    <>
      <Button color="secondary" onClick={onOpen} ref={buttonRef}>
        <AccountCircle />
      </Button>

      {open && (
        <List
          component="nav"
          aria-label="account relative"
          className={classes.list}
          ref={ref}
        >
          <ListItem button className={classes.button}>
            <ListItemText primary="Sign In" />
          </ListItem>
          <ListItem button className={classes.button}>
            <ListItemText primary="Register" />
          </ListItem>
        </List>
      )}
    </>
  );
};

export default AuthDropdown;

import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Logo from '../header/Logo';
import AuthDropdown from '../header/AuthDropdown';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
      margin: 0,
      padding: '1rem',
    },
  }),
);

const Header = () => {
  const classes = useStyles();

  // TODO: about page
  // TODO: search
  // TODO: create
  // TODO: auth / info

  return (
    <Container component="header" className={classes.root} maxWidth={false}>
      <Logo />
      <nav className="nav">
        <AuthDropdown />
      </nav>
    </Container>
  );
};

export default Header;

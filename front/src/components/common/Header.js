import React from 'react';
import { Button, Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Logo from '../header/Logo';
import AuthDropdown from '../header/AuthDropdown';
import { Link } from 'react-router-dom';

const StyledButton = React.forwardRef((props, ref) => {
  return <Link style={{ marginLeft: '1rem' }} ref={ref} {...props} />;
});

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
  // TODO: auth / info

  return (
    <Container component="header" className={classes.root} maxWidth={false}>
      <Logo />
      <div style={{ fontSize: '2rem', flex: 1 }}>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          component={StyledButton}
          to={'/about'}
        >
          About
        </Button>
      </div>
      <nav className="nav">
        <AuthDropdown />
      </nav>
    </Container>
  );
};

export default Header;

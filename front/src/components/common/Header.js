import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
      margin: 0,
      padding: '1rem',
    },
  }),
);

const Header = () => {
  const classes = useStyles();

  // TODO: search
  // TODO: create
  // TODO: auth / info

  return (
    <Container component="header" className={classes.root} maxWidth={false}>
      <h1>
        <a href="/">
          <FontAwesomeIcon
            icon={['fas', 'poll']}
            style={{ marginRight: '0.5rem' }}
          />
          Goract Survey
        </a>
      </h1>
    </Container>
  );
};

export default Header;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  anchor: {
    fontFamily: 'Black Han Sans',
    // font-family: 'Gugi', cursive;
    // font-family: 'Jua', sans-serif;
    // font-family: 'Nixie One', cursive;
    // font-family: 'Noto Sans KR', sans-serif;
    // font-family: 'Teko', sans-serif;
  },
}));

const Logo = () => {
  const classes = useStyle();
  return (
    <Typography variant="h3" gutterBottom={false}>
      <a href="/" className={classes.anchor}>
        <FontAwesomeIcon
          icon={['fas', 'poll']}
          style={{ marginRight: '0.5rem' }}
        />
        Goract Survey
      </a>
    </Typography>
  );
};

export default Logo;

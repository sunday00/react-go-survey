import React from 'react';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import { useSurveyStyle } from '../../lib/styles/mainStyle';

import InfoSurveys from './InfoSurveys';

const InfoContainer = () => {
  const classes = useSurveyStyle();

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <CssBaseline />
      <Typography component="h3" variant="h3" className={classes.title}>
        My info
      </Typography>

      <hr />

      <InfoSurveys />
    </Container>
  );
};

export default InfoContainer;

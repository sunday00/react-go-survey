import React from 'react';
import { mainStyle } from '../lib/styles/mainStyle';
import { Route } from 'react-router-dom';
import Home from './Home';
import SurveyCreate from './survey/SurveyCreate';
import Container from '@material-ui/core/Container';

const MainWrapper = () => {
  const classes = mainStyle();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Route component={Home} path="/" exact></Route>
      <Route component={SurveyCreate} path="/survey/create"></Route>
    </Container>
  );
};

export default MainWrapper;

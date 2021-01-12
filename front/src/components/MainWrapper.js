import React from 'react';
import { mainStyle } from '../lib/styles/mainStyle';
import { Route } from 'react-router-dom';
import Home from './Home';
import SurveyCreate from './survey/SurveyCreate';
import RespondentSetting from './survey/RespondentSetting';
import Container from '@material-ui/core/Container';

const MainWrapper = () => {
  const classes = mainStyle();
  return (
    <Container maxWidth={false} className={classes.root}>
      <Route component={Home} path="/" exact></Route>
      <Route
        component={SurveyCreate}
        path="/survey/create/main-setting"
      ></Route>
      <Route
        component={RespondentSetting}
        path="/survey/create/respondent-setting"
      ></Route>
    </Container>
  );
};

export default MainWrapper;

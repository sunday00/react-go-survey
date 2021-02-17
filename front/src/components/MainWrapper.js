import React from 'react';
import { mainStyle } from '../lib/styles/mainStyle';
import { Route } from 'react-router-dom';
import Home from './Home';

import Container from '@material-ui/core/Container';

import SurveyCreate from './survey/SurveyCreate';
import RespondentSetting from './survey/RespondentSetting';
import QuestionContainer from './survey/QuestionContainer';
import ReadContainer from './survey/ReadContainer';
import ResultContainer from './survey/ResultContainer';

const MainWrapper = () => {
  const classes = mainStyle();
  return (
    <Container maxWidth={false} className={classes.root}>
      <Route component={Home} path="/" exact></Route>
      <Route component={SurveyCreate} path="/survey/create/main-setting"></Route>
      <Route component={RespondentSetting} path="/survey/create/respondent-setting"></Route>
      <Route component={QuestionContainer} path="/survey/create/question/:questionNo"></Route>
      <Route component={ReadContainer} path="/survey/read/:surveyNo"></Route>
      <Route component={ResultContainer} path="/survey/result/:surveyNo"></Route>
    </Container>
  );
};

export default MainWrapper;

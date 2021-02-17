import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useSurveyStyle } from '../../lib/styles/mainStyle';
import { read } from '../../modules/result';

const ResultContainer = ({ match }) => {
  const dispatch = useDispatch();
  const surveyNo = match.params.surveyNo;
  const classes = useSurveyStyle();

  const results = useSelector((state) => state.results);

  useEffect(() => {
    dispatch(read(surveyNo));
  }, [dispatch, surveyNo]);

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>{!results && <CircularProgress color="secondary" />}</div>
    </Container>
  );
};

export default ResultContainer;
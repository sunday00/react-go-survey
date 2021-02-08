import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { read } from '../../modules/survey';
import ReadMain from './ReadMain';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useSurveyStyle, CssTextField } from '../../lib/styles/mainStyle';

const ReadContainer = ({ match }) => {
  const surveyNo = match.params.surveyNo;

  const classes = useSurveyStyle();
  const dispatch = useDispatch();
  const survey = useSelector((state) => state.survey);

  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!survey.main.title) dispatch(read(surveyNo));
  }, [dispatch, survey.main.title, surveyNo]);

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        {!survey.main.title && <CircularProgress color="secondary" />}
        {survey.main.title && page === 0 && (
          <ReadMain title={survey.main.title} description={survey.main.description} />
        )}
      </div>
    </Container>
  );
};

export default ReadContainer;

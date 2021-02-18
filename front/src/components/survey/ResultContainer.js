import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import ResultChoice from './ResultChoice';
import { useSurveyStyle } from '../../lib/styles/mainStyle';
import { read } from '../../modules/result';

const ResultContainer = ({ match }) => {
  const dispatch = useDispatch();
  const surveyNo = match.params.surveyNo;
  const classes = useSurveyStyle();

  const { title, results } = useSelector((state) => state.results);

  useEffect(() => {
    dispatch(read(surveyNo));
  }, [dispatch, surveyNo]);

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        {!results && <CircularProgress color="secondary" />}
        {results && (
          <Typography component="h1" variant="h3" className={classes.title}>
            {title}
          </Typography>
        )}

        {results &&
          results.map(
            (r) => r.Type === 'choice' && <ResultChoice key={r.ID} r={r} classes={classes} />,
          )}
      </div>
    </Container>
  );
};

export default ResultContainer;

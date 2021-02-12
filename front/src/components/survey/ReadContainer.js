import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { read } from '../../modules/survey';
import ReadMain from './ReadMain';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useSurveyStyle } from '../../lib/styles/mainStyle';
import ReadChoice from './ReadChoice';

const ReadContainer = ({ match }) => {
  const surveyNo = match.params.surveyNo;

  const classes = useSurveyStyle();
  const dispatch = useDispatch();
  const survey = useSelector((state) => state.survey);

  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (!survey.main.title) dispatch(read(surveyNo));
    return dispatch(read(surveyNo));
  }, [dispatch, survey.main.title, surveyNo]);

  const Question = useCallback(() => {
    const handleSubmit = (e) => {
      e.preventDefault();

      let goTo = page + 1;

      if (e.target.answer) {
        const ans = { k: e.target.answerNo.value, v: e.target.answer.value };

        const newAnswers = [...answers];
        newAnswers[page - 1] = ans;
        setAnswers(newAnswers);
        console.log(newAnswers);

        const skip =
          survey.questions.length < e.target.skip.value
            ? survey.questions.length
            : e.target.skip.value;

        if (skip > goTo) {
          console.log(skip);
          goTo = skip;
        }
      }

      setPage(goTo);
      // TODO:: set answer value
    };

    const handlePrev = () => {
      setPage(page - 1);
    };

    if (survey.main.title && page === 0) {
      return (
        <ReadMain
          title={survey.main.title}
          description={survey.main.description}
          onNext={handleSubmit}
        />
      );
    }
    const q = survey.questions[page - 1];
    return q.type === 'choice' ? (
      <ReadChoice question={q} onSubmit={handleSubmit} onPrev={handlePrev} />
    ) : (
      ''
    );
  }, [page, survey.main.description, survey.main.title, survey.questions, answers]);

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        {!survey.main.title && <CircularProgress color="secondary" />}
        {survey.main.title && Question()}
      </div>
    </Container>
  );
};

export default ReadContainer;

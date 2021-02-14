import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useSurveyStyle } from '../../lib/styles/mainStyle';
import { read } from '../../modules/survey';
import ReadMain from './ReadMain';
import ReadChoice from './ReadChoice';
import ReadEssay from './ReadEssay';
import ReadComplete from './ReadComplete';

const ReadContainer = ({ match }) => {
  const surveyNo = match.params.surveyNo;

  const classes = useSurveyStyle();
  const dispatch = useDispatch();
  const survey = useSelector((state) => state.survey);

  const [page, setPage] = useState(0);
  const [prev, setPrev] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (!survey.main.title) dispatch(read(surveyNo));
    return dispatch(read(surveyNo));
  }, [dispatch, survey.main.title, surveyNo]);

  const Question = useCallback(() => {
    const q = survey.questions[page - 1];

    const handleSubmit = (e) => {
      e.preventDefault();

      let goTo = page + 1;

      if (e.target.answer) {
        let v;

        if (q.len >= 2) {
          v = [];
          e.target.answer.forEach((a) => {
            if (a.checked) v.push(a.value);
          });
        } else {
          v = e.target.answer.value;
        }

        const ans = { k: e.target.answerNo.value, v };

        const newAnswers = [...answers];
        newAnswers[page - 1] = ans;
        setAnswers(newAnswers);

        const skip =
          survey.questions.length < e.target.skip.value
            ? survey.questions.length + 1
            : e.target.skip.value;

        if (skip > goTo) {
          console.log(skip);
          goTo = skip;
        }
      }

      setPrev(page);
      setPage(goTo);
      // TODO:: set answer value
    };

    const handlePrev = () => {
      setPage(prev);
    };

    const handleComplete = (e) => {
      e.preventDefault();

      console.log('submit to backend');
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

    if (survey.main.title && page === survey.questions.length + 1) {
      return (
        <ReadComplete title={survey.main.title} onPrev={handlePrev} onComplete={handleComplete} />
      );
    }

    return q.type === 'choice' ? (
      <ReadChoice question={q} onSubmit={handleSubmit} onPrev={handlePrev} />
    ) : (
      <ReadEssay question={q} onSubmit={handleSubmit} onPrev={handlePrev} />
    );
  }, [page, prev, survey.main.description, survey.main.title, survey.questions, answers]);

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

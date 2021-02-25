import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router';

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
  const history = useHistory();

  const [page, setPage] = useState(0);
  const [prev, setPrev] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (!survey.main.title) dispatch(read(surveyNo));
    return dispatch(read(surveyNo));
  }, [dispatch, survey.main.title, surveyNo]);

  const Question = useCallback(() => {
    const q = survey.questions[page - 1];
    const already = q && answers.find((a) => Number.parseInt(a.k) === q.no);

    const handleSubmit = (e) => {
      e.preventDefault();

      let goTo = page + 1;

      if (e.target.answer) {
        let v = [];

        if (q.type === 'choice') {
          e.target.answer.forEach((a) => {
            if (a.checked) v.push(a.value);
          });
        } else {
          v.push(e.target.answer.value);
        }

        const ans = { k: e.target.answerNo.value, t: q.type, v };

        const newAnswers = [...answers];
        newAnswers[page - 1] = ans;
        setAnswers(newAnswers);

        const skip =
          survey.questions.length < e.target.skip.value
            ? survey.questions.length + 1
            : e.target.skip.value;

        if (skip > goTo) {
          goTo = skip;
        }
      }

      setPrev([...prev, page]);
      setPage(goTo);
    };

    const handlePrev = () => {
      const currentPrevList = [...prev];
      const currentPrev = currentPrevList.pop();
      setPage(currentPrev);
      setPrev(currentPrevList);
    };

    const handleComplete = (e) => {
      e.preventDefault();

      axios
        .post(`/survey/answer/${surveyNo}`, {
          surveyNo: Number.parseInt(surveyNo),
          answers,
        })
        .then((res) => {
          console.info('readContainer.js 91 : TODO:: check user duplicate, show result ');

          if (res.data.success === 1) {
            history.push('/');
          }
        });
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
      <ReadChoice question={q} onSubmit={handleSubmit} onPrev={handlePrev} already={already} />
    ) : (
      <ReadEssay question={q} onSubmit={handleSubmit} onPrev={handlePrev} already={already} />
    );
  }, [
    page,
    prev,
    surveyNo,
    history,
    survey.main.description,
    survey.main.title,
    survey.questions,
    answers,
  ]);

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

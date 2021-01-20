import React, { useCallback } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useSurveyStyle } from '../../lib/styles/mainStyle';

import QuestionEssay from './QuestionEssay';

const QuestionContainer = (props) => {
  const classes = useSurveyStyle();

  const questionNo = Number.parseInt(props.match.params.questionNo);
  const questions = [{ no: 1, type: 'essay', q: '', options: {} }];

  const Questions = useCallback(() => {
    const quest = questions.find((q) => q.no === questionNo);

    return (
      quest.type === 'essay' && (
        <QuestionEssay no={quest.no} options={quest.options}></QuestionEssay>
      )
    );
  }, [questions, questionNo]);

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      {Questions()}
    </Container>
  );
};

export default QuestionContainer;

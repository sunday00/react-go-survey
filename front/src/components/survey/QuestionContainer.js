import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

import { useSurveyStyle } from '../../lib/styles/mainStyle';

import { pushQuest, editQuest } from '../../modules/survey';
import QuestionEssay from './QuestionEssay';
import QuestionChoice from './QuestionChoice';

const BackButton = React.forwardRef((props, ref) => {
  return <Link ref={ref} {...props} />;
});

const QuestionContainer = (props) => {
  const classes = useSurveyStyle();

  const questions = useSelector((state) => state.survey.questions);
  const dispatch = useDispatch();

  const questionNo = Number.parseInt(props.match.params.questionNo);
  const [errors, setErrors] = useState({
    q: [false, ''],
    description: [false, ''],
    start: [false, ''],
    end: [false, ''],
  });

  const quest = useMemo(() => {
    return questions.find((q) => q.no === questionNo);
  }, [questions, questionNo]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // TODO:: get qst from local storage

    if (quest) return quest;
    else dispatch(pushQuest({ no: questionNo, type: 'choice', q: '', options: {} }));
  }, [dispatch, questionNo, quest]);

  const Questions = useCallback(() => {
    const handleChange = (e, field, idx) => {
      quest[field] = e.target.value;
      dispatch(editQuest(quest, idx));
    };

    return (
      quest && (
        <form noValidate onSubmit={handleOnSubmit}>
          <Typography component="h1" variant="h5" className={classes.title}>
            문항 {quest.no} 생성
          </Typography>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" style={{ color: 'white' }}>
              형태
            </FormLabel>
            <RadioGroup
              aria-label="유형"
              name="type"
              value={quest.type}
              onChange={(e) => handleChange(e, 'type', quest.no)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                border: '1px solid',
                borderRadius: '4px',
              }}
            >
              <FormControlLabel value="choice" control={<Radio />} label="객관식" />
              <FormControlLabel value="essay" control={<Radio />} label="주관식" />
            </RadioGroup>
          </FormControl>
          {quest.type === 'choice' && (
            <QuestionChoice
              handleChange={handleChange}
              quest={quest}
              error={errors.q}
              classes={classes}
            ></QuestionChoice>
          )}
          {quest.type === 'essay' && (
            <QuestionEssay
              handleChange={handleChange}
              quest={quest}
              error={errors.q}
              classes={classes}
            ></QuestionEssay>
          )}
          <div className={'MuiFormControl-marginNormal ' + classes.buttonWrap}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.button}
              component={BackButton}
              to="/survey/create/respondent-setting"
            >
              Back
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Next
            </Button>
          </div>
          <div className={'MuiFormControl-marginNormal ' + classes.buttonWrap}>
            <Button type="submit" fullWidth variant="contained" className={classes.completeButton}>
              COMPLETE
            </Button>
          </div>
        </form>
      )
    );
  }, [dispatch, quest, classes, errors]);

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      {Questions()}
    </Container>
  );
};

export default QuestionContainer;

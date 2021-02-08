import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from 'axios';

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
import { setMain as setMainSetting } from '../../modules/survey';
import { setSub as setSubSetting } from '../../modules/survey';

import QuestionEssay from './QuestionEssay';
import QuestionChoice from './QuestionChoice';

const BackButton = React.forwardRef((props, ref) => {
  return <Link ref={ref} {...props} />;
});

const QuestionContainer = (props) => {
  const classes = useSurveyStyle();
  const history = useHistory();

  const questions = useSelector((state) => state.survey.questions);
  const survey = useSelector((state) => state.survey);
  const dispatch = useDispatch();

  const questionNo = Number.parseInt(props.match.params.questionNo);
  const [errors, setErrors] = useState({
    q: [false, ''],
    o: [false, ''],
  });

  const quest = useMemo(() => {
    setErrors({ q: [false, ''] });
    return questions.find((q) => q.no === questionNo);
  }, [questions, questionNo]);

  const optionsRef = useRef();

  useEffect(() => {
    const mainSetting = window.localStorage.getItem('sv_cr_tp');
    if (mainSetting) {
      dispatch(setMainSetting(JSON.parse(mainSetting)));
    }

    const subSetting = window.localStorage.getItem('sv_cr_sp');
    if (subSetting) {
      dispatch(setSubSetting(JSON.parse(subSetting)));
    }
  }, [dispatch]);

  useEffect(() => {
    const storedQuest = window.localStorage.getItem(`sv_cr_q${questionNo}`);

    for (let i = 1; i < questionNo; i++) {
      const foreQuest = window.localStorage.getItem(`sv_cr_q${i}`);
      if (!questions.find((q) => q.no === i)) dispatch(pushQuest(JSON.parse(foreQuest)));
    }

    if (quest) return quest;
    else if (storedQuest) dispatch(pushQuest(JSON.parse(storedQuest)));
    else dispatch(pushQuest({ no: questionNo, type: 'choice', q: '', options: {} }));
  }, [dispatch, questions, questionNo, quest]);

  const Questions = useCallback(() => {
    const handleChange = (e, field, idx) => {
      setErrors({
        q: [false, null],
        o: [null, null],
      });
      quest[field] = field === 'len' ? Number.parseInt(e.target.value) : e.target.value;
      dispatch(editQuest(quest, idx));
    };

    const handleOnSubmit = (e) => {
      e.preventDefault();

      if (e.target.querySelector('#q').value === '') {
        setErrors({
          ...errors,
          q: [true, '무엇을 질문하는지는 필수 값입니다.'],
        });
        return false;
      }

      //TODO:: options skip value should check loop.
      // if skip value less then question id, err.
      let optionErr;
      quest.type === 'choice' &&
        quest.options.forEach((o, i) => {
          if (o.skip && o.skip <= quest.no) {
            setErrors({
              ...errors,
              o: [i, '뒤로 건너뛸 수는 없습니다.'],
            });
            optionErr = true;
          }
        });
      if (optionErr) return false;

      if (e.nativeEvent.submitter.dataset.submitter === 'next') {
        const clonedQuest = { ...quest };

        if (quest.type === 'choice') {
          const optionsState = optionsRef.current.getOptions().filter((o) => o.value !== '');
          handleChange({ target: { value: optionsState } }, 'options', quest.no);
          clonedQuest.options = [...optionsState];
        }

        window.localStorage.setItem(`sv_cr_q${clonedQuest.no}`, JSON.stringify(clonedQuest));
        history.push(`/survey/create/question/${clonedQuest.no + 1}`);

        return;
      }

      // submitter is complete
      axios.post('/survey/store', survey).then((res) => {
        if (res.data && res.data.success === 1) {
          window.localStorage.clear();
          history.push('/');
        }
      });
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
              error={errors}
              classes={classes}
              ref={optionsRef}
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
              to={
                quest.no === 1
                  ? '/survey/create/respondent-setting'
                  : `/survey/create/question/${quest.no - 1}`
              }
            >
              Back
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.button}
              data-submitter="next"
            >
              Next
            </Button>
          </div>
          <div className={'MuiFormControl-marginNormal ' + classes.buttonWrap}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.completeButton}
              data-submitter="complete"
            >
              COMPLETE
            </Button>
          </div>
        </form>
      )
    );
  }, [dispatch, history, survey, quest, classes, errors]);

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      {Questions()}
    </Container>
  );
};

export default QuestionContainer;

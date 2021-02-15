import React, { useState, useCallback, useRef, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Radio, Checkbox } from '@material-ui/core';

import { useSurveyStyle } from '../../lib/styles/mainStyle';

const RadioSelect = ({ question, already }) => {
  const [skip, setSkip] = useState('');

  const handleChange = useCallback(
    (e) => {
      setSkip(question.options.find((o) => o.optionId === Number.parseInt(e.target.value)).skip);
    },
    [question.options],
  );

  const options = useCallback(() => {
    return question.options.map((o) => (
      <FormControlLabel
        key={o.optionId}
        value={o.optionId + ''}
        control={<Radio />}
        label={o.value}
      />
    ));
  }, [question.options]);

  useEffect(() => {
    already && handleChange({ target: { value: already.v[0] } });
  }, [already, handleChange]);

  return (
    <FormControl component="fieldset" fullWidth>
      <input type="hidden" name="answerNo" value={question.no} />
      <input type="hidden" name="skip" value={skip} />
      <RadioGroup
        aria-label={question.q}
        name="answer"
        onChange={handleChange}
        defaultValue={already && already.v[0]}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        {options()}
      </RadioGroup>
    </FormControl>
  );
};

const CheckSelect = ({ question, already }) => {
  const [skip, setSkip] = useState('');

  const checkList = useRef();

  const handleChangeCallback = useCallback(
    (e) => {
      let skipCandidates = [];
      checkList.current.querySelectorAll('[name="answer"]:checked').forEach((c) => {
        const selectedSkip = question.options.find((o) => o.optionId === Number.parseInt(c.value))
          .skip;
        skipCandidates.push(selectedSkip);
      });

      if (skipCandidates.length) setSkip(Math.min(...skipCandidates));
      else setSkip('');
    },
    [checkList, question.options],
  );

  useEffect(() => {
    handleChangeCallback('');
  });

  const options = useCallback(() => {
    const handleChange = handleChangeCallback;

    return question.options.map((o) => (
      <FormControlLabel
        key={o.optionId}
        control={
          <Checkbox
            name="answer"
            value={o.optionId + ''}
            defaultChecked={already && already.v.indexOf(`${o.optionId}`) >= 0}
          />
        }
        label={o.value}
        onChange={handleChange}
      />
    ));
  }, [question.options, already, handleChangeCallback]);

  return (
    <div component="fieldset">
      <input type="hidden" name="answerNo" value={question.no} />
      <input type="hidden" name="skip" value={skip} />
      <div
        aria-label={question.q}
        ref={checkList}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        {options()}
      </div>
    </div>
  );
};

const ReadChoice = ({ question, onPrev, onSubmit, already }) => {
  const classes = useSurveyStyle();

  return (
    <form noValidate onSubmit={onSubmit}>
      <Typography component="h1" variant="h3" className={classes.title}>
        {question.q}
      </Typography>

      {question.len <= 1 && <RadioSelect question={question} already={already} />}
      {question.len >= 2 && <CheckSelect question={question} already={already} />}

      <hr />

      <div className={'MuiFormControl-marginNormal ' + classes.buttonWrap}>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={onPrev}
        >
          뒤로
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.button}
          data-submitter="next"
        >
          다음
        </Button>
      </div>
    </form>
  );
};

export default ReadChoice;

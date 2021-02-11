import React, { useCallback } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { useSurveyStyle } from '../../lib/styles/mainStyle';

const RadioSelect = ({ question }) => {
  const options = useCallback(() => {
    return question.options.map((o) => (
      <FormControlLabel key={o.optionId} value={o.value} control={<Radio />} label={o.value} />
    ));
  });

  return (
    <FormControl component="fieldset" fullWidth>
      <RadioGroup
        aria-label={question.q}
        name="answer"
        // value={quest.type}
        // onChange={(e) => handleChange(e, 'type', quest.no)}
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

const ReadChoice = ({ question, onPrev, onSubmit }) => {
  const classes = useSurveyStyle();

  return (
    <form noValidate onSubmit={onSubmit}>
      <Typography component="h1" variant="h3" className={classes.title}>
        {question.q}
      </Typography>

      <RadioSelect question={question} />

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

import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';

import { useSurveyStyle, CssTextField } from '../../lib/styles/mainStyle';

const TextArea = ({ question }) => {
  return (
    <FormControl component="fieldset" fullWidth>
      <input type="hidden" name="answerNo" value={question.no} />
      <input type="hidden" name="skip" value="0" />

      <CssTextField
        variant="outlined"
        margin="normal"
        required
        // error={errors.description[0]}
        // helperText={errors.description[1]}
        multiline
        fullWidth
        id="answer"
        label="대답"
        name="answer"
        rows="3"
      />
    </FormControl>
  );
};

const ReadEssay = ({ question, onPrev, onSubmit }) => {
  const classes = useSurveyStyle();

  return (
    <form noValidate onSubmit={onSubmit}>
      <Typography component="h1" variant="h3" className={classes.title}>
        {question.q}
      </Typography>

      <TextArea question={question} />

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

export default ReadEssay;

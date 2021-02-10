import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useSurveyStyle } from '../../lib/styles/mainStyle';

const ReadChoice = ({ question, onPrev, onNext }) => {
  const classes = useSurveyStyle();

  return (
    <div>
      <Typography component="h1" variant="h3" className={classes.title}>
        {question.q}
      </Typography>
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
          type="button"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.button}
          data-submitter="next"
          onClick={onNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default ReadChoice;

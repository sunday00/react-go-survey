import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useSurveyStyle } from '../../lib/styles/mainStyle';

const ReadComplete = ({ onPrev, onComplete }) => {
  const classes = useSurveyStyle();

  return (
    <form noValidate onSubmit={onComplete}>
      <Typography component="h1" variant="h3" className={classes.title}>
        감사합니다.
      </Typography>

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
          완료
        </Button>
      </div>
    </form>
  );
};

export default ReadComplete;

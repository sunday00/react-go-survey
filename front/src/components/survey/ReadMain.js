import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useSurveyStyle } from '../../lib/styles/mainStyle';

const BackButton = React.forwardRef((props, ref) => {
  return <Link ref={ref} {...props} />;
});

const ReadMain = ({ title, description, onNext }) => {
  const classes = useSurveyStyle();

  //TODO:: make buttons : go back to list / start
  return (
    <div>
      <Typography component="h1" variant="h3" className={classes.title}>
        {title}
      </Typography>
      <Typography component="p" variant="h5" className={classes.subTitle}>
        {description}
      </Typography>

      <hr />

      <div className={'MuiFormControl-marginNormal ' + classes.buttonWrap}>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.button}
          component={BackButton}
          to="/"
        >
          취소
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
          시작
        </Button>
      </div>
    </div>
  );
};

export default ReadMain;

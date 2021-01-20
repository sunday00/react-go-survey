import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { useSurveyStyle } from '../../lib/styles/mainStyle';

const QuestionEssay = ({ no }) => {
  const classes = useSurveyStyle();

  const handleChange = (e) => {};

  const handleOnSubmit = (e) => {};

  return (
    <div>
      <Typography component="h1" variant="h5" className={classes.title}>
        문항 {no} 생성
      </Typography>
      <form noValidate onSubmit={handleOnSubmit}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" style={{ color: 'white' }}>
            형태
          </FormLabel>
          <RadioGroup
            aria-label="주관식"
            name="gender"
            value={''}
            onChange={(e) => handleChange(e, 'gender')}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              border: '1px solid',
              borderRadius: '4px',
            }}
          >
            <FormControlLabel
              value="notCare"
              control={<Radio />}
              label="무관"
            />
            <FormControlLabel value="female" control={<Radio />} label="여" />
            <FormControlLabel value="male" control={<Radio />} label="남" />
          </RadioGroup>
        </FormControl>
      </form>
    </div>
  );
};

export default QuestionEssay;

import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { useSurveyStyle, CssTextField } from '../../lib/styles/mainStyle';

// import { mainStyle } from '../lib/styles/mainStyle';

const SurveyCreate = () => {
  const classes = useSurveyStyle();
  const [selectedDate, setSelectedDate] = useState(
    new Date('2014-08-18T21:11:54'),
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title}>
          기본설정
        </Typography>
        <form noValidate>
          <CssTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="title"
            label="제목"
            id="title"
            autoFocus
            // onChange={(e) => handleSubInfoChange(e, 'job')}
          />
          <CssTextField
            variant="outlined"
            margin="normal"
            required
            multiline
            fullWidth
            id="description"
            label="설명"
            name="description"
            rows="3"
            // onChange={(e) => handleSubInfoChange(e, 'group')}
          />
          <div
            className="MuiFormControl-marginNormal"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <CssTextField
              variant="outlined"
              id="date"
              label="start"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <CssTextField
              variant="outlined"
              id="date"
              label="start"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Next
          </Button>
        </form>
      </div>
      {/* <Box mt={8}></Box> */}
    </Container>
  );
};

export default SurveyCreate;

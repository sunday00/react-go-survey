import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { useSurveyStyle, CssTextField } from '../../lib/styles/mainStyle';
import { setMain as setMainSetting } from '../../modules/survey';

const BackButton = React.forwardRef((props, ref) => {
  return <Link ref={ref} {...props} />;
});

const RespondentSetting = () => {
  const classes = useSurveyStyle();
  const dispatch = useDispatch();
  // const history = useHistory();

  const [main, setMain] = useState({
    title: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    title: [false, ''],
    description: [false, ''],
    start: [false, ''],
    end: [false, ''],
  });

  const refs = {
    title: useRef(),
    description: useRef(),
    start: useRef(),
    end: useRef(),
  };

  const handleChange = (e, field) => {
    setMain({
      ...main,
      [field]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    const newErrors = { ...errors };
    Object.keys(main)
      .reverse()
      .forEach((k) => {
        if (main[k] === '') {
          newErrors[k] = [true, 'required'];
          refs[k].current.querySelector('.MuiOutlinedInput-input').focus();
        } else newErrors[k] = [false, ''];
      });

    setErrors({ ...newErrors });

    if (Object.keys(newErrors).find((k) => newErrors[k][0] === true)) {
      return;
    }

    window.localStorage.setItem('sv_cr_tp', JSON.stringify(main));
    dispatch(setMainSetting(main));
  };

  //TODO:: make form for limit answerer
  // ex:: for male? for over 20 age? for nitroeye ? anything...

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title}>
          대상자 선정
        </Typography>
        <form noValidate onSubmit={handleOnSubmit}>
          <CssTextField
            variant="outlined"
            margin="normal"
            required
            error={errors.title[0]}
            helperText={errors.title[1]}
            fullWidth
            name="title"
            label="제목"
            id="title"
            autoFocus
            value={main.title}
            onChange={(e) => handleChange(e, 'title')}
            ref={refs.title}
          />
          <CssTextField
            variant="outlined"
            margin="normal"
            required
            error={errors.description[0]}
            helperText={errors.description[1]}
            multiline
            fullWidth
            id="description"
            label="설명"
            name="description"
            rows="3"
            value={main.description}
            onChange={(e) => handleChange(e, 'description')}
            ref={refs.description}
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
              required
              error={errors.start[0]}
              helperText={errors.start[1]}
              value={main.start}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => handleChange(e, 'start')}
              ref={refs.start}
            />
            <CssTextField
              variant="outlined"
              id="date"
              label="end"
              type="date"
              required
              error={errors.end[0]}
              helperText={errors.end[1]}
              value={main.end}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => handleChange(e, 'end')}
              ref={refs.end}
            />
          </div>

          <div className={'MuiFormControl-marginNormal ' + classes.buttonWrap}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.button}
              component={BackButton}
              to="/survey/create/main-setting"
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
        </form>
      </div>
      {/* <Box mt={8}></Box> */}
    </Container>
  );
};

export default RespondentSetting;

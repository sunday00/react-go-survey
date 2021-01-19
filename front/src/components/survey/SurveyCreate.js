import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Moment from 'moment';

import { useSurveyStyle, CssTextField } from '../../lib/styles/mainStyle';
import { setMain as setMainSetting } from '../../modules/survey';

const SurveyCreate = () => {
  const classes = useSurveyStyle();
  const dispatch = useDispatch();
  const history = useHistory();

  const storedMain = useSelector((state) => state.survey.main);

  useEffect(() => {
    if (!storedMain.title && window.localStorage.getItem('sv_cr_tp')) {
      dispatch(
        setMainSetting(JSON.parse(window.localStorage.getItem('sv_cr_tp'))),
      );
    }
  }, [storedMain, dispatch]);

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
    dispatch(
      setMainSetting({
        ...storedMain,
        [field]: e.target.value,
      }),
    );

    setErrors({
      ...errors,
      [field]: [],
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newErrors = { ...errors };
    Object.keys(storedMain)
      .reverse()
      .forEach((k) => {
        if (storedMain[k] === '') {
          newErrors[k] = [true, 'required'];
          refs[k].current.querySelector('.MuiOutlinedInput-input').focus();
        } else newErrors[k] = [false, ''];
      });

    if (Moment(storedMain.start).isAfter(storedMain.end)) {
      newErrors.start = [true, 'should before end'];
      newErrors.end = [true, 'should after start'];
    }

    if (
      Moment(storedMain.start).isBefore(Moment().format('YYYY-MM-DD')) ||
      Moment(storedMain.end).isBefore()
    ) {
      newErrors.start = [true, "we don't have time machine"];
      newErrors.end = [true, "we don't have time machine"];
    }

    setErrors({ ...newErrors });

    if (Object.keys(newErrors).find((k) => newErrors[k][0] === true)) {
      return;
    }

    window.localStorage.setItem('sv_cr_tp', JSON.stringify(storedMain));
    history.push('/survey/create/respondent-setting');
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title}>
          기본설정
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
            value={storedMain.title}
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
            value={storedMain.description}
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
              value={storedMain.start || ''}
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
              value={storedMain.end || ''}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => handleChange(e, 'end')}
              ref={refs.end}
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

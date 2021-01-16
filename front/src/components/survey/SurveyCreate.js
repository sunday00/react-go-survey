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

  const [main, setMain] = useState({
    title: '',
    description: '',
    start: Moment().format('YYYY-MM-DD'),
    end: Moment().add(3, 'd').format('YYYY-MM-DD'),
  });

  useEffect(() => {
    if (storedMain.title !== '') {
      setMain(storedMain);
    } else if (window.localStorage.getItem('sv_cr_tp')) {
      setMain(JSON.parse(window.localStorage.getItem('sv_cr_tp')));
    }
  }, [storedMain]);

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
    setErrors({
      ...errors,
      [field]: [],
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newErrors = { ...errors };
    Object.keys(main)
      .reverse()
      .forEach((k) => {
        if (main[k] === '') {
          newErrors[k] = [true, 'required'];
          refs[k].current.querySelector('.MuiOutlinedInput-input').focus();
        } else newErrors[k] = [false, ''];
      });

    if (Moment(main.start).isAfter(main.end)) {
      newErrors.start = [true, 'should before end'];
      newErrors.end = [true, 'should after start'];
    }

    if (
      Moment(main.start).isBefore(Moment().format('YYYY-MM-DD')) ||
      Moment(main.end).isBefore()
    ) {
      newErrors.start = [true, "we don't have time machine"];
      newErrors.end = [true, "we don't have time machine"];
    }

    setErrors({ ...newErrors });

    if (Object.keys(newErrors).find((k) => newErrors[k][0] === true)) {
      return;
    }

    window.localStorage.setItem('sv_cr_tp', JSON.stringify(main));
    dispatch(setMainSetting(main));
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

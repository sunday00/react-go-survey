import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { useSurveyStyle, CssTextField } from '../../lib/styles/mainStyle';
import { setMain as setMainSetting } from '../../modules/survey';
import ReactTagify from '../common/ReactTagify';

const BackButton = React.forwardRef((props, ref) => {
  return <Link ref={ref} {...props} />;
});

const RespondentSetting = () => {
  const classes = useSurveyStyle();
  const dispatch = useDispatch();
  // const history = useHistory();

  const [respondSetting, setRespondSetting] = useState({
    gender: 'female',
  });

  const [errors, setErrors] = useState({
    title: [false, ''],
    description: [false, ''],
    start: [false, ''],
    end: [false, ''],
  });

  const tagifyConfig = useRef({
    blacklist: [],
    maxTags: 3,
    backspace: 'edit',
    placeholder: 'jobs',
    editTags: 1,
    dropdown: {
      enabled: 0,
    },
    whitelist: ['student', 'development', 'sports'],
  });

  const initialTags = useRef([]);

  const refs = {
    title: useRef(),
    description: useRef(),
    start: useRef(),
    end: useRef(),
  };

  const handleChange = (e, field) => {
    setRespondSetting({
      ...respondSetting,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // console.log('submit');
    // const newErrors = { ...errors };
    // Object.keys(main)
    //   .reverse()
    //   .forEach((k) => {
    //     if (main[k] === '') {
    //       newErrors[k] = [true, 'required'];
    //       refs[k].current.querySelector('.MuiOutlinedInput-input').focus();
    //     } else newErrors[k] = [false, ''];
    //   });

    // setErrors({ ...newErrors });

    // if (Object.keys(newErrors).find((k) => newErrors[k][0] === true)) {
    //   return;
    // }

    // window.localStorage.setItem('sv_cr_tp', JSON.stringify(main));
    // dispatch(setMainSetting(main));
  };

  //TODO:: make form for limit answerer
  // ex:: for male? for over 20 age? for nitroeye ? anything...

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5" className={classes.title}>
          대상자 선정
        </Typography>
        <form noValidate onSubmit={handleOnSubmit}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" style={{ color: 'white' }}>
              성별
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              defaultValue={respondSetting.gender}
              onChange={handleChange}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                border: '1px solid',
                borderRadius: '4px',
              }}
            >
              <FormControlLabel value="female" control={<Radio />} label="여" />
              <FormControlLabel value="male" control={<Radio />} label="남" />
              <FormControlLabel
                value="notCare"
                control={<Radio />}
                label="무관"
              />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" style={{ color: 'white' }}>
              직업
            </FormLabel>
            <ReactTagify
              settings={tagifyConfig.current}
              initialValues={initialTags.current}
              // handleChange={}
            />
          </FormControl>
          <CssTextField
            variant="outlined"
            margin="normal"
            required
            error={errors.description[0]}
            helperText={errors.description[1]}
            fullWidth
            id="description"
            label="직업"
            name="description"
            value={'main.description'}
            onChange={(e) => handleChange(e, 'description')}
            ref={refs.description}
          />
          <div
            className="MuiFormControl-marginNormal"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          ></div>

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

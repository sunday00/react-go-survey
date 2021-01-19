import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { useSurveyStyle } from '../../lib/styles/mainStyle';
import { setMain as setMainSetting } from '../../modules/survey';
import { setSub as setSubSetting } from '../../modules/survey';

import {
  getGroups,
  getJobs,
  getSubGroups,
  getInterested,
  getInitialTags,
} from '../../modules/system';
import ReactTagify from '../common/ReactTagify';
import SelectBox from '../common/SelectBox';

const BackButton = React.forwardRef((props, ref) => {
  return <Link ref={ref} {...props} />;
});

const RespondentSetting = () => {
  const classes = useSurveyStyle();
  const dispatch = useDispatch();
  const tagsRefs = {
    jobs: useRef([]),
    groups: useRef([]),
    subGroups: useRef([]),
    interested: useRef([]),
  };

  const { jobs, groups, subGroups, interested } = useSelector(
    (state) => state.system,
  );
  const sub = useSelector((state) => state.survey.sub);

  const [jobWhitelist, setJobWhitelist] = useState([]);
  const [groupWhitelist, setGroupWhitelist] = useState([]);
  const [subGroupWhitelist, setSubGroupWhitelist] = useState([]);
  const [interestedWhitelist, setInterestedWhitelist] = useState([]);
  const [subAgeSelectDisplay, setSubAgeSelectDisplay] = useState(false);

  useEffect(() => {
    dispatch(getInitialTags());
  }, [dispatch]);

  useEffect(() => {
    setJobWhitelist(jobs);
    setGroupWhitelist(groups);
    setSubGroupWhitelist(subGroups);
    setInterestedWhitelist(interested);
  }, [jobs, groups, subGroups, interested]);

  useEffect(() => {
    const mainSetting = window.localStorage.getItem('sv_cr_tp');
    if (mainSetting) {
      dispatch(setMainSetting(JSON.parse(mainSetting)));
    }

    const subSetting = window.localStorage.getItem('sv_cr_sp');
    if (subSetting) {
      tagsRefs.jobs.current.addTags(JSON.parse(subSetting).jobs);
      tagsRefs.groups.current.addTags(JSON.parse(subSetting).groups);
      tagsRefs.subGroups.current.addTags(JSON.parse(subSetting).subGroups);
      tagsRefs.interested.current.addTags(JSON.parse(subSetting).interested);
      dispatch(setSubSetting(JSON.parse(subSetting)));
    }
  }, [
    dispatch,
    tagsRefs.jobs,
    tagsRefs.groups,
    tagsRefs.subGroups,
    tagsRefs.interested,
  ]);

  const changJobs = useCallback(
    (e) => {
      dispatch(getJobs(e.detail.originalEvent.currentTarget.textContent));
    },
    [dispatch],
  );

  const changGroups = useCallback(
    (e) => {
      dispatch(getGroups(e.detail.originalEvent.currentTarget.textContent));
    },
    [dispatch],
  );

  const changSubGroups = useCallback(
    (e) => {
      dispatch(getSubGroups(e.detail.originalEvent.currentTarget.textContent));
    },
    [dispatch],
  );

  const changeInterested = useCallback(
    (e) => {
      dispatch(getInterested(e.detail.originalEvent.currentTarget.textContent));
    },
    [dispatch],
  );

  const handleMainAgesChange = (e) => {
    if (e.currentTarget.value === 'custom') {
      setSubAgeSelectDisplay(true);
      dispatch(
        setSubSetting({
          ...sub,
          age: 'custom',
        }),
      );
    } else {
      setSubAgeSelectDisplay(false);
      sub.subAgeMin && delete sub.subAgeMin;
      sub.subAgeMax && delete sub.subAgeMax;
      dispatch(
        setSubSetting({
          ...sub,
          age: e.target.value,
        }),
      );
    }
  };

  const handleChange = (e, field, isTag = false) => {
    if (isTag) {
      const val = tagsRefs[field].current.value.map((v) => v.value);
      dispatch(setSubSetting(val, field));
    } else {
      dispatch(
        setSubSetting({
          ...sub,
          [field]: e.target.value,
        }),
      );
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    window.localStorage.setItem('sv_cr_sp', JSON.stringify(sub));
    // TODO:: go to next :: finally create questions!!
    // history.push('/survey/create/respondent-setting');
  };

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
              value={sub.gender}
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
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" style={{ color: 'white' }}>
              직업
            </FormLabel>
            <ReactTagify
              settings={{ placeholder: 'jobs' }}
              handleChange={(e) => handleChange(e, 'jobs', true)}
              handleKeydown={changJobs}
              whitelist={jobWhitelist}
              tagifyRef={tagsRefs.jobs}
            />
          </FormControl>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" style={{ color: 'white' }}>
              연령대
            </FormLabel>
            <Grid container spacing={1}>
              <SelectBox
                optionsSet="ages"
                onChange={(e) => handleMainAgesChange(e)}
                value={sub.age}
              ></SelectBox>
              <SelectBox
                optionsSet="ages"
                onChange={(e) => handleChange(e, 'subAgeMin')}
                optionsSetExclude="custom"
                defaultDisplay={subAgeSelectDisplay}
              ></SelectBox>
              {subAgeSelectDisplay && (
                <span style={{ lineHeight: '2.6rem' }}> ~ </span>
              )}
              <SelectBox
                optionsSet="ages"
                onChange={(e) => handleChange(e, 'subAgeMax')}
                optionsSetExclude="custom"
                defaultDisplay={subAgeSelectDisplay}
              ></SelectBox>
            </Grid>
          </FormControl>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" style={{ color: 'white' }}>
              메인 그룹
            </FormLabel>
            <ReactTagify
              settings={{ placeholder: 'groups' }}
              handleChange={(e) => handleChange(e, 'groups', true)}
              handleKeydown={changGroups}
              whitelist={groupWhitelist}
              tagifyRef={tagsRefs.groups}
            />
          </FormControl>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" style={{ color: 'white' }}>
              서브 그룹
            </FormLabel>
            <ReactTagify
              settings={{ placeholder: 'subGroups' }}
              handleChange={(e) => handleChange(e, 'subGroups', true)}
              handleKeydown={changSubGroups}
              whitelist={subGroupWhitelist}
              tagifyRef={tagsRefs.subGroups}
            />
          </FormControl>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" style={{ color: 'white' }}>
              관심사
            </FormLabel>
            <ReactTagify
              settings={{ placeholder: 'interested' }}
              handleChange={(e) => handleChange(e, 'interested', true)}
              handleKeydown={changeInterested}
              whitelist={interestedWhitelist}
              tagifyRef={tagsRefs.interested}
            />
          </FormControl>

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

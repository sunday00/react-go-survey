import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Copyright from './Copyright';
import ReactTagify from './ReactTagify';

import { setUserTags, setUserSubInfo } from '../../modules/auth';

const AuthCallBackForm = ({ classes, photo }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const initialTags = useRef([]);

  const handleTagsChange = (e) => {
    if (e.target.value === '') return;
    const tags = JSON.parse(e.target.value).map((t) => t.value);

    dispatch(setUserTags(tags));
  };

  const handleSubInfoChange = (e, field) => {
    dispatch(setUserSubInfo({ key: field, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/store', auth).then((res) => {
      console.log(res);
      // TODO:: link to home
      // setSinged
    });
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.main}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src={photo}></Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Job"
            label="Job"
            id="Job"
            autoFocus
            onChange={(e) => handleSubInfoChange(e, 'job')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Group"
            label="Group"
            name="Group"
            onChange={(e) => handleSubInfoChange(e, 'group')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="SubGroup"
            label="SubGroup"
            id="SubGroup"
            onChange={(e) => handleSubInfoChange(e, 'subGroup')}
          />
          <ReactTagify
            initialValues={initialTags.current}
            handleChange={handleTagsChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Join
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default AuthCallBackForm;

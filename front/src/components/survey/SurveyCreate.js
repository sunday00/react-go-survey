import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

// import { mainStyle } from '../lib/styles/mainStyle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(4),
    alignSelf: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  title: {
    // fontFamily: 'Black Han Sans',
    fontFamily: 'Gugi',
    color: '#fff',
    // font-family: 'Jua', sans-serif;
    // font-family: 'Nixie One', cursive;
    // font-family: 'Noto Sans KR', sans-serif;
    // font-family: 'Teko', sans-serif;
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const CssTextField = withStyles((theme) => ({
  root: {
    '& label.MuiFormLabel-root.Mui-focused': {
      color: theme.palette.primary.contrastText,
    },
    '& label.MuiFormLabel-root': {
      color: theme.palette.primary.superLight,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.superLight,
        color: theme.palette.primary.superLight,
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.contrastText,
      },
    },
  },
}))(TextField);

const SurveyCreate = () => {
  const classes = useStyles();
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
            fullWidth
            id="Group"
            label="Group"
            name="Group"
            // onChange={(e) => handleSubInfoChange(e, 'group')}
          />
          <CssTextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="SubGroup"
            label="SubGroup"
            id="SubGroup"
            // onChange={(e) => handleSubInfoChange(e, 'subGroup')}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
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

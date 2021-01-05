import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleBtn: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#db4932',
    color: '#fff',
    '&:hover': {
      background: '#b73420',
    },
  },
  kakaoBtn: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#f1d900',
    color: '#391b1b',
    '&:hover': {
      background: '#e8c504',
    },
  },
}));

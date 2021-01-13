import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export const mainStyle = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      display: 'flex',
      flex: 1,
    },
  }),
);

export const useSurveyStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(4),
    alignSelf: 'center',
    '& .MuiFormControl-root': {
      marginTop: theme.spacing(2),
      '& .ReactTagify-input-20': {
        marginTop: '1px',
      },
      '& .tagify.tagify--focus': {
        borderColor: '#fff',
        borderWidth: '2px',
      },
    },
    '& .MuiFormControl-marginNormal .MuiFormControl-root': {
      marginTop: 0,
    },
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
  buttonWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

export const CssTextField = withStyles((theme) => ({
  root: {
    '& .MuiInputBase-input ': {
      color: theme.palette.primary.contrastText,
    },
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
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: 'tomato',
        borderWidth: '2px',
      },
    },
    '& .MuiFormHelperText-root.Mui-error': {
      color: 'orange',
    },
  },
}))(TextField);

import { makeStyles, createStyles } from '@material-ui/core/styles';

export const mainStyle = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      display: 'flex',
      flex: 1,
    },
  }),
);

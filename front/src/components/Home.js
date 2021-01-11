import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      flex: 1,
    },
  }),
);

const Home = ({ theme }) => {
  const classes = useStyles();
  return <div className={classes.root}>Home</div>;
};

export default Home;

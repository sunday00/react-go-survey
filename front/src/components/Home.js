import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useSurveyStyle } from '../lib/styles/mainStyle';
import { getSurveys } from '../modules/info';

const Home = () => {
  const classes = useSurveyStyle();
  const dispatch = useDispatch();
  const surveys = useSelector((state) => state.info.surveys);

  useEffect(() => {
    dispatch(getSurveys());
  }, [dispatch]);

  return (
    <section>
      <Typography component="h5" variant="h5" className={classes.title}>
        My surveys
      </Typography>

      {surveys.length === 0 && surveys.join('') !== 'notLogged' && <CircularProgress />}
      {surveys.join('') === 'notLogged' && <h1>Not logged. Please sign in.</h1>}

      <List component="nav" aria-label="secondary mailbox folders">
        {surveys.join('') !== 'notLogged' &&
          surveys.map((s, i) => (
            <ListItem button key={i} component="a" href={`/survey/read/${s.id}`}>
              <ListItemText primary={s.title} />
              <span>{s.cnt} 명 참여</span>
            </ListItem>
          ))}
      </List>
    </section>
  );
};

//TODO::
// 이미 종료되었는지

export default Home;

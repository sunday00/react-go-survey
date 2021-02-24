import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useSurveyStyle } from '../../lib/styles/mainStyle';
import { getMySurveys } from '../../modules/info';

const InfoSurveys = () => {
  const classes = useSurveyStyle();
  const dispatch = useDispatch();
  const surveys = useSelector((state) => state.info.surveys);

  useEffect(() => {
    dispatch(getMySurveys());
  }, [dispatch]);

  return (
    <section>
      <Typography component="h5" variant="h5" className={classes.title}>
        My surveys
      </Typography>

      <List component="nav" aria-label="secondary mailbox folders">
        {surveys.map((s, i) => (
          <ListItem button key={i} component="a" href={`/survey/result/${s.id}`}>
            <ListItemText primary={s.title} />
            <span>{s.cnt} 명 참여</span>
          </ListItem>
        ))}
      </List>
    </section>
  );
};

//TODO::
// 종료까지 남은 기간

export default InfoSurveys;

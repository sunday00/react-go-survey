import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useSurveyStyle } from '../lib/styles/mainStyle';
import { getSurveys } from '../modules/info';

const ListComponent = ({ classes, surveys, title, filterCallback }) => {
  return (
    <section className="list-section">
      <Typography component="h5" variant="h5" className={classes.title}>
        {title}
      </Typography>

      <List component="nav" aria-label="secondary mailbox folders">
        {surveys.filter(filterCallback).map((s, i) => (
          <ListItem button key={i} component="a" href={`/survey/read/${s.id}`}>
            <ListItemText primary={s.title} />
          </ListItem>
        ))}
        {surveys.filter(filterCallback).length === 0 && (
          <ListItem button={false}>
            <ListItemText primary={'-'} />
          </ListItem>
        )}
      </List>
    </section>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const surveys = useSelector((state) => state.info.surveys);
  const classes = useSurveyStyle();

  useEffect(() => {
    dispatch(getSurveys());
  }, [dispatch]);

  return (
    <section className="main lists">
      {surveys.length === 0 && surveys.join('') !== 'notLogged' && surveys.join('') !== 'notAvailable' && <CircularProgress />}
      {surveys.length !== 0 && surveys.join('') !== 'notLogged' && surveys.join('') === 'notAvailable' && <h1>Not Available.</h1>}
      {surveys.length !== 0 && surveys.join('') === 'notLogged' && <h1>Not logged. Please sign in.</h1>}
      {surveys.length !== 0 && surveys.join('') !== 'notLogged' && surveys.join('') !== 'notAvailable' && auth.user.gender && (
        <>
          <ListComponent
            classes={classes}
            surveys={surveys}
            title={auth.user.gender === 'male' ? '남성 대상' : '여성 대상'}
            filterCallback={(s) => s.gender === auth.user.gender}
          />
          <ListComponent
            classes={classes}
            surveys={surveys}
            title={`${auth.subInfo.job} 대상`}
            filterCallback={(s) => s.jobs.indexOf(auth.subInfo.job) > -1}
          />
          <ListComponent
            classes={classes}
            surveys={surveys}
            title={`${auth.subInfo.group} 대상`}
            filterCallback={(s) => s.groups.indexOf(auth.subInfo.group) > -1}
          />
          <ListComponent
            classes={classes}
            surveys={surveys}
            title={`${auth.subInfo.subGroup} 대상`}
            filterCallback={(s) => s.subGroups.indexOf(auth.subInfo.subGroup) > -1}
          />

          {auth.subInfo.interested.map((interested, i) => (
            <ListComponent
              key={i}
              classes={classes}
              surveys={surveys}
              title={`${interested}에 관심있는 사람 대상`}
              filterCallback={(s) => s.interested.indexOf(interested) > -1}
            />
          ))}

          <ListComponent
            classes={classes}
            surveys={surveys}
            title={`누구나 참여가능한 설문`}
            filterCallback={(s) => s.age===999 && s.subAgeMin === 0 && s.subAgeMax === 100 && s.gender === 'notCare'
              && s.jobs.length === 1 && s.jobs[0] ===''
              && s.groups.length === 1 && s.groups[0] ===''
              && s.subGroups.length === 1 && s.subGroups[0] ===''
              && s.interested.length === 1 && s.interested[0] ===''
            }
          />
        </>
      )}
    </section>
  );
};

//TODO::
// 이미 종료되었는지

export default Home;

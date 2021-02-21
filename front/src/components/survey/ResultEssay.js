import React, { useState } from 'react';

import { makeStyles, createStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyle = makeStyles((theme) =>
  createStyles({
    show: { display: 'block' },
    hide: { display: 'none' },
  }),
);

const ResultEssay = ({ r, classes }) => {
  const listClasses = useStyle();
  const [listAllToggle, setListAllToggle] = useState(false);

  const handleClick = (e) => {
    const showAll = listAllToggle === false ? true : false;
    setListAllToggle(showAll);
  };

  return (
    <div>
      <hr style={{ margin: '1rem' }} />
      <Typography component="h1" variant="h4" className={classes.title}>
        {r.Title}
      </Typography>
      <section className="articles">
        {r.Answers.length > 3 && (
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleClick}
          >
            {listAllToggle ? '숨기기' : '모두 보기'}
          </Button>
        )}
        <List component="nav" aria-label="secondary mailbox folders">
          {r.Answers.map((a, i) => (
            <ListItem
              button={false}
              key={i}
              className={i < 3 || listAllToggle ? listClasses.show : listClasses.hide}
            >
              <ListItemText primary={a.Answer} />
            </ListItem>
          ))}
        </List>
        {r.Answers.length > 3 && !listAllToggle && <span onClick={handleClick}>...</span>}
      </section>
    </div>
  );
};

export default ResultEssay;

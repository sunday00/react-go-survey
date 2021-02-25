import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BeforSignButtons = ({ classesProp, handleOnClick }) => {
  return (
    <>
      <ListItem
        button
        className={classesProp.button}
        onClick={() => handleOnClick('/signin')}
      >
        <ListItemIcon style={{ minWidth: 0 }}>
          <FontAwesomeIcon
            icon={['fas', 'sign-in-alt']}
            style={{ marginRight: '0.5rem' }}
          />
        </ListItemIcon>
        <ListItemText primary="Sign In" />
      </ListItem>
      <ListItem
        button
        className={classesProp.button}
        onClick={() => handleOnClick('/register')}
      >
        <ListItemIcon style={{ minWidth: 0 }}>
          <FontAwesomeIcon
            icon={['fas', 'user-plus']}
            style={{ marginRight: '0.5rem' }}
          />
        </ListItemIcon>
        <ListItemText primary="Register" />
      </ListItem>
    </>
  );
};

export default BeforSignButtons;

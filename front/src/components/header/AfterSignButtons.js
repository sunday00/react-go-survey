import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AfterSignButtons = ({ classesProp, handleOnClick }) => {
  return (
    <>
      <ListItem
        button
        className={classesProp.button}
        onClick={() => handleOnClick('/survey/create')}
      >
        <ListItemIcon style={{ minWidth: 0 }}>
          <FontAwesomeIcon
            icon={['fas', 'pencil-alt']}
            style={{ marginRight: '0.5rem' }}
          />
        </ListItemIcon>
        <ListItemText primary="Create" />
      </ListItem>
      <ListItem
        button
        className={classesProp.button}
        onClick={() => handleOnClick('/info')}
      >
        <ListItemIcon style={{ minWidth: 0 }}>
          <FontAwesomeIcon
            icon={['fas', 'user']}
            style={{ marginRight: '0.5rem' }}
          />
        </ListItemIcon>
        <ListItemText primary="My page" />
      </ListItem>
      <ListItem
        button
        className={classesProp.button}
        onClick={() => handleOnClick('/signout')}
      >
        <ListItemIcon style={{ minWidth: 0 }}>
          <FontAwesomeIcon
            icon={['fas', 'sign-out-alt']}
            style={{ marginRight: '0.5rem' }}
          />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItem>
    </>
  );
};

export default AfterSignButtons;

import React from 'react';

import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
  modal: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.7)',
  },
  header: {
    color: 'white',
  },
  body: {
    margin: '1rem auto',
  },
});

const Modal = ({ message, button }) => {
  const classes = useStyle();
  return (
    <div className={classes.modal}>
      <header className={classes.header}>{message.msgType}</header>
      <body className={classes.body}>{message.msg}</body>
      <button onClick={button.handleClick}>{button.title}</button>
    </div>
  );
};

export default Modal;

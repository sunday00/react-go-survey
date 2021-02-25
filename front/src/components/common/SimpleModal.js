import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';

function getModalStyle() {
  return {
    alignSelf: 'center',
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: '0 auto',
    display: 'block',
  },
}));

export default function SimpleModal({ modal }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!modal);
    return () => {
      setOpen(!!modal);
    };
  }, [modal]);

  return (
    <>
      {modal && (
        <div>
          <Modal
            className={classes.root}
            open={open}
            onClose={modal.button.handleClick}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
              <h2 id="simple-modal-title">{modal.message.msgType}</h2>
              <p id="simple-modal-description">{modal.message.msg}</p>
              <div>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={modal.button.handleClick}
                >
                  {modal.button.title}
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}

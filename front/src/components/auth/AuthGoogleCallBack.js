import React from 'react';

import useAuthStyle from '../../lib/styles/authStyle';
import AuthCallBackForm from './AuthCallBackForm';
import Modal from '../common/Modal';

const AuthGoogleCallBack = ({ photo, modal }) => {
  const classes = useAuthStyle();

  return (
    <>
      <AuthCallBackForm classes={classes} photo={photo} />

      {modal && <Modal message={modal.message} button={modal.button}></Modal>}
    </>
  );
};

export default AuthGoogleCallBack;

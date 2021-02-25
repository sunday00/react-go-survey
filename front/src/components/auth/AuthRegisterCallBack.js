import React from 'react';

import useAuthStyle from '../../lib/styles/authStyle';
import AuthCallBackForm from './AuthCallBackForm';
import SimpleModal from '../common/SimpleModal';

const AuthRegisterCallBack = ({ photo, modal }) => {
  const classes = useAuthStyle();

  return (
    <>
      <AuthCallBackForm classes={classes} photo={photo} />

      {modal && <SimpleModal modal={modal}></SimpleModal>}
    </>
  );
};

export default AuthRegisterCallBack;

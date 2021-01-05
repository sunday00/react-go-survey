import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router';

import { setUserProfile, setUserPhoto } from '../../modules/auth';
import useAuthStyle from '../../lib/styles/authStyle';
import AuthCallBackForm from './AuthCallBackForm';
import Modal from '../common/Modal';

const AuthGoogleCallBack = ({ vendor }) => {
  const classes = useAuthStyle();
  const { photo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const [modal, setModal] = useState();

  useEffect(() => {
    const url = window.location.href.replace(
      process.env.REACT_APP_CLIENT_DOMAIN,
      process.env.REACT_APP_SERVER_DOMAIN,
    );

    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        const userInfo = res.data;

        const birthdays = userInfo.birthdays.find((b) => {
          return b.metadata.primary === true;
        }).date;

        dispatch(
          setUserProfile({
            id: userInfo.names[0].metadata.source.id,
            vendor: 'google',
            email: userInfo.emailAddresses.find((m) => {
              return m.metadata.primary === true;
            }).value,
            name: userInfo.names[0].displayName,
            gender: userInfo.genders[0].formattedValue,
            birthday: {
              full: [birthdays.year, birthdays.month, birthdays.day].join('-'),
              age: new Date().getFullYear() - birthdays.year,
              ...birthdays,
            },
          }),
        );
        dispatch(
          setUserPhoto(
            userInfo.photos.find((p) => {
              return p.metadata.primary === true;
            }).url,
          ),
        );
      })
      .catch((err) => {
        console.error(err);

        if (err.response.status === 401) {
          const message = {
            msgType: 'error',
            msg:
              '쿠키가 만료되었거나 제거 되었습니다. 재발급을 위해 다시 시도하여 주세요.',
          };

          const button = {
            handleClick: () => {
              history.goBack();
            },

            title: 'retry',
          };

          setModal({ message, button });
        }
      });
    return;
  }, [dispatch, setModal]);

  return (
    <>
      <AuthCallBackForm classes={classes} photo={photo} />

      {modal && <Modal message={modal.message} button={modal.button}></Modal>}
    </>
  );
};

export default AuthGoogleCallBack;

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router';

import Modal from '../common/Modal';
import {
  setUserProfile,
  setUserPhoto,
  setUserSubInfo,
  setSigned,
} from '../../modules/auth';

const AuthGoogleSigninCallBack = ({ vendor }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [modal, setModal] = useState();
  const [id, setId] = useState();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const url = window.location.href.replace(
      process.env.REACT_APP_CLIENT_DOMAIN,
      process.env.REACT_APP_SERVER_DOMAIN,
    );

    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        const userInfo = res.data.data;

        const birthdays = userInfo.birthdays.find((b) => {
          return b.metadata.primary === true;
        }).date;

        const subInfo = {
          job: res.data.sub.job,
          group: res.data.sub.group,
          subGroup: res.data.sub.group,
          interested: res.data.sub.interested,
        };

        dispatch(
          setUserProfile({
            vendorId: userInfo.names[0].metadata.source.id.toString(),
            vendor: 'google',
            email: userInfo.emailAddresses.find((m) => {
              return m.metadata.primary === true;
            }).value,
            name: userInfo.names[0].displayName,
            gender: userInfo.genders[0].formattedValue.toLowerCase(),
            ageRange:
              Math.floor((new Date().getFullYear() - birthdays.year) / 10) * 10,
          }),
        );
        dispatch(
          setUserPhoto(
            userInfo.photos.find((p) => {
              return p.metadata.primary === true;
            }).url,
          ),
        );

        dispatch(setUserSubInfo(subInfo));

        setId(res.data.sub.id);
      })
      .catch((err) => {
        console.error(err);

        if (err.response.status === 401 || err.response.status === 403) {
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
  }, [dispatch, setModal, history]);

  useEffect(() => {
    if (
      !auth.user.vendorId ||
      !auth.subInfo.job ||
      !auth.subInfo.group ||
      !id
    ) {
      return;
    }

    axios.post('/auth/sign', { ...auth, id }).then((res) => {
      if (res.data.success === 1) {
        dispatch(setSigned(true));
        history.push('/');
      }
    });
  }, [auth, dispatch, id]);

  return (
    <>
      {modal && <Modal message={modal.message} button={modal.button}></Modal>}
    </>
  );
};

export default AuthGoogleSigninCallBack;

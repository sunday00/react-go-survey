import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router';

import AuthKakaoCallBack from './AuthKakaoCallBack';
import { setUserProfile, setUserPhoto } from '../../modules/auth';

const AuthKakaoCallBackContainer = ({ vendor }) => {
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

        dispatch(
          setUserProfile({
            id: userInfo.id,
            vendor: 'kakao',
            email: userInfo.kakao_account.email,
            name: userInfo.properties.nickname,
            gender: userInfo.kakao_account.gender,
            ageRange: userInfo.kakao_account.age_range.split('~')[0],
          }),
        );
        dispatch(setUserPhoto(userInfo.properties.profile_image));
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

  return <AuthKakaoCallBack photo={photo} modal={modal} />;
};

export default AuthKakaoCallBackContainer;

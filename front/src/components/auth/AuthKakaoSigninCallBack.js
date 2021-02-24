import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router';

import SimpleModal from '../common/SimpleModal';
import { setUserProfile, setUserPhoto, setUserSubInfo, setSigned } from '../../modules/auth';

const AuthKakaoSignCallBack = ({ vendor }) => {
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

        const subInfo = {
          job: res.data.sub.job,
          group: res.data.sub.group,
          subGroup: res.data.sub.subGroup,
          interested: res.data.sub.interested,
        };

        dispatch(
          setUserProfile({
            vendorId: userInfo.id.toString(),
            vendor: 'kakao',
            email: userInfo.kakao_account.email,
            name: userInfo.properties.nickname,
            gender: userInfo.kakao_account.gender,
            ageRange: parseInt(userInfo.kakao_account.age_range.split('~')[0]),
          }),
        );
        dispatch(setUserPhoto(userInfo.properties.profile_image));

        dispatch(setUserSubInfo(subInfo));

        setId(res.data.sub.id);
      })
      .catch((err) => {
        console.error(err);

        if (err.response.status === 401 || err.response.status === 403) {
          const message = {
            msgType: 'error',
            msg: '쿠키가 만료되었거나 제거 되었습니다. 재발급을 위해 다시 시도하여 주세요.',
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
    if (!auth.user.vendorId || !auth.subInfo.job || !auth.subInfo.group || !id) {
      return;
    }

    axios.post('/auth/sign', { ...auth, id }).then((res) => {
      if (res.data.success === 1) {
        dispatch(setSigned(true));
        history.push('/');
      }
    });
  }, [auth, dispatch, id, history]);

  return <>{modal && <SimpleModal modal={modal}></SimpleModal>}</>;
};

export default AuthKakaoSignCallBack;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setUserProfile, setUserPhoto } from '../../modules/auth';
import useAuthStyle from '../../lib/styles/authStyle';
import AuthCallBackForm from './AuthCallBackForm';

const AuthGoogleCallBack = ({ vendor }) => {
  const classes = useAuthStyle();
  const { photo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const url = window.location.href.replace(
      process.env.REACT_APP_CLIENT_DOMAIN,
      process.env.REACT_APP_SERVER_DOMAIN,
    );

    axios.get(url, { withCredentials: true }).then((res) => {
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
    });
    return;
  }, [dispatch]);

  return <AuthCallBackForm classes={classes} photo={photo} />;
};

export default AuthGoogleCallBack;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthCallBack = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // let storageUser = window.localStorage.getItem('userInfo');
    // if (!storageUser) {
    const url = window.location.href.replace(
      process.env.REACT_APP_CLIENT_DOMAIN,
      process.env.REACT_APP_SERVER_DOMAIN,
    );

    axios.get(url, { withCredentials: true }).then((res) => {
      setUserInfo(res.data);
      // window.localStorage.setItem('userInfo', JSON.stringify(res.data));
    });
    return;
    // }

    // setUserInfo(JSON.parse(storageUser));
  }, []);

  return (
    <div>
      {userInfo && (
        <>
          <p>{userInfo.email}</p>
          <p>{userInfo.id}</p>
          <img src={userInfo.picture} alt="avatar" />
        </>
      )}
    </div>
  );
};

export default AuthCallBack;

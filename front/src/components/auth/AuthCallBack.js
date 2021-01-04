import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthCallBack = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const url = window.location.href.replace(
      process.env.REACT_APP_CLIENT_DOMAIN,
      process.env.REACT_APP_SERVER_DOMAIN,
    );

    axios.get(url, { withCredentials: true }).then((res) => {
      setUserInfo(res.data);
    });
    return;
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

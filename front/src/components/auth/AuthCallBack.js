import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthCallBack = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const url = window.location.href.replace(':3000', ':3001');
    axios.get(url).then((res) => {
      setUserInfo(res.data);
    });
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

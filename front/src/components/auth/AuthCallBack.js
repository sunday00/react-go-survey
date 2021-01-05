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
          {console.log(userInfo)}
          <p>
            {
              userInfo.emailAddresses.find((m) => {
                return m.metadata.primary === true;
              }).value
            }
          </p>
          <p>{userInfo.names[0].metadata.source.id}</p>
          <img
            src={
              userInfo.photos.find((p) => {
                return p.metadata.primary === true;
              }).url
            }
            alt="user"
          />
        </>
      )}
    </div>
  );
};

export default AuthCallBack;

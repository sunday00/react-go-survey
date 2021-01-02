import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Logo = () => {
  return (
    <h1>
      <a href="/">
        <FontAwesomeIcon
          icon={['fas', 'poll']}
          style={{ marginRight: '0.5rem' }}
        />
        Goract Survey
      </a>
    </h1>
  );
};

export default Logo;

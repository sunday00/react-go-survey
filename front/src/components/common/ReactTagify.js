import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Tags from '@yaireo/tagify/dist/react.tagify';
import '@yaireo/tagify/src/tagify.scss';

const styles = {
  input: {
    marginTop: '16px',
    marginBottom: '8px',
    borderColor: '#c0c0c0',
    borderRadius: '4px',
  },
};

const ReactTagify = ({
  classes,
  initialValues,
  handleChange,
  handleKeydown,
  settings,
  whitelist,
}) => {
  return (
    <Tags
      onChange={handleChange}
      onKeydown={handleKeydown}
      className={classes.input}
      settings={settings}
      value={initialValues}
      whitelist={whitelist}
    />
  );
};

export default withStyles(styles)(ReactTagify);

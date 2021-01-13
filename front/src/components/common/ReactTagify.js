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

const ReactTagify = ({ classes, initialValues, handleChange, settings }) => {
  return (
    <Tags
      onChange={handleChange}
      className={classes.input}
      settings={settings}
      value={initialValues}
    />
  );
};

export default withStyles(styles)(ReactTagify);

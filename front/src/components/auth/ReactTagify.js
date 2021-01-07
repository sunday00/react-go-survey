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

const tagifyConfig = {
  blacklist: [],
  maxTags: 3,
  backspace: 'edit',
  placeholder: 'Interested',
  editTags: 1,
  dropdown: {
    enabled: 0,
  },
  whitelist: ['coding', 'development', 'sports'],
};

const ReactTagify = ({ classes, initialValues, handleChange }) => {
  return (
    <Tags
      onChange={handleChange}
      className={classes.input}
      settings={tagifyConfig}
      value={initialValues}
    />
  );
};

export default withStyles(styles)(ReactTagify);

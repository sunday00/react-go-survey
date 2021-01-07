import React, { useState } from 'react';

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
  callbacks: {
    // add: handleChange,
    // remove: handleChange,
    // blur: handleChange,
    // edit: handleChange,
    // invalid: handleChange,
    // click: handleChange,
    // focus: handleChange,
    // "edit:updated": handleChange,
    // "edit:start": handleChange
  },
};

const ReactTagify = ({ classes }) => {
  const [tags, setTags] = useState([]);

  return (
    <Tags className={classes.input} settings={tagifyConfig} value={tags} />
  );
};

export default withStyles(styles)(ReactTagify);

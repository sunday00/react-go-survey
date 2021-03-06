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

const defaultTagifyConfig = {
  blacklist: [],
  maxTags: 3,
  backspace: 'edit',
  placeholder: 'tags',
  editTags: 1,
  dropdown: {
    enabled: 0,
  },
  whitelist: [],
};

const ReactTagify = ({
  classes,
  handleChange,
  handleKeydown,
  settings,
  whitelist,
  tagifyRef,
}) => {
  const tagifyConfig = {
    ...defaultTagifyConfig,
    ...settings,
  };

  return (
    <Tags
      onChange={handleChange}
      onKeydown={handleKeydown}
      className={classes.input}
      settings={tagifyConfig}
      whitelist={whitelist}
      tagifyRef={tagifyRef}
    />
  );
};

export default withStyles(styles)(ReactTagify);

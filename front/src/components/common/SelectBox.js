import React, { useCallback } from 'react';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    '&::after': {
      content: '"\\25BC"',
      position: 'absolute',
      right: theme.spacing(1),
      lineHeight: '2.3rem',
    },
  },
  input: {
    position: 'relative',
    marginTop: '0',
    marginBottom: '8px',
    paddingLeft: theme.spacing(1),
    borderRadius: '4px',
    width: '100%',
    height: '2.3rem',
    border: '1px solid',
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.contrastText,
    backgroundColor: 'transparent',
    '& option': {
      color: theme.palette.primary.dark,
      backgroundColor: 'transparent',
    },
    appearance: 'none',
    zIndex: 1,
  },
});

const OptionsSets = {
  ages: [
    { value: 0, text: 'under 10' },
    { value: 10, text: '10~19' },
    { value: 20, text: '20~29' },
    { value: 30, text: '30~39' },
    { value: 40, text: '40~49' },
    { value: 50, text: '50~59' },
    { value: 60, text: '60~69' },
    { value: 70, text: '70~79' },
    { value: 80, text: '80~89' },
    { value: 90, text: '90~99' },
    { value: 100, text: '100 or over' },
    { value: 999, text: '여러 세대' },
  ],
};

const SelectBox = ({
  defaultDisplay = true,
  classes,
  optionsSet,
  optionsSetExclude,
  value,
  onChange,
}) => {
  const options = useCallback(
    () =>
      OptionsSets[optionsSet].map(
        (o) =>
          o.value !== optionsSetExclude && (
            <option key={o.value} value={o.value}>
              {o.text}
            </option>
          ),
      ),
    [optionsSet, optionsSetExclude],
  );

  return (
    defaultDisplay && (
      <Grid item className={classes.root}>
        <select className={classes.input} onChange={onChange} value={value}>
          {options()}
        </select>
      </Grid>
    )
  );
};

export default withStyles(styles)(SelectBox);

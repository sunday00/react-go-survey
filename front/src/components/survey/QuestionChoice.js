import React from 'react';

import Button from '@material-ui/core/Button';

import { CssTextField } from '../../lib/styles/mainStyle';

const QuestionChoice = ({ quest, handleChange, classes, error }) => {
  return (
    <div>
      <CssTextField
        variant="outlined"
        margin="normal"
        required
        error={error[0]}
        helperText={error[1]}
        multiline
        fullWidth
        id="q"
        label="질문"
        name="q"
        rows="3"
        value={quest.q}
        onChange={(e) => handleChange(e, 'q', quest.no)}
        // ref={refs.description}
      />
      <CssTextField
        variant="outlined"
        margin="normal"
        type="number"
        error={false}
        helperText={''}
        fullWidth
        name="len"
        label="택 : ex) 1"
        id="len"
        value={1}
        min={1}
        // max={답글갯수}
        onChange={(e) => handleChange(e, 'len', quest.no)}
        // ref={refs.title}
      />
      <CssTextField
        variant="outlined"
        margin="normal"
        error={false}
        helperText={''}
        fullWidth
        name="op"
        label="선택지: ex) 네"
        id="op"
        value={''}
        onChange={(e) => handleChange(e, 'op', quest.no)}
        // ref={refs.title}
      />
      <CssTextField
        variant="outlined"
        margin="normal"
        error={false}
        helperText={''}
        fullWidth
        name="op"
        label="선택지: ex) 아니오"
        id="op"
        value={''}
        onChange={(e) => handleChange(e, 'op', quest.no)}
        // ref={refs.title}
      />
      <div className={'MuiFormControl-marginNormal ' + classes.buttonWrap}>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          className={classes.functionalButton}
          to="/survey/create/main-setting"
        >
          선택지 추가
        </Button>
      </div>
    </div>
  );
};

export default QuestionChoice;

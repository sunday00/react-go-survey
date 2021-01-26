import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { CssTextField } from '../../lib/styles/mainStyle';

const Selectable = ({ idx, removeOption, handleOptionChange, classes, quest, option }) => {
  return (
    <div
      className="MuiFormControl-marginNormal"
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <CssTextField
        variant="outlined"
        required
        margin="normal"
        error={false}
        helperText={''}
        name="op"
        label="선택지: ex) 네 / 아니오"
        id={`op${option.optionId}`}
        value={option.value}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => handleOptionChange(e, 'value', option.optionId)}
        style={{ width: '70%' }}
        // ref={refs.title}
      />
      <CssTextField
        variant="outlined"
        type="number"
        margin="normal"
        error={false}
        helperText={''}
        name="skip"
        label="~번으로"
        id="skip"
        value={option.skip}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => handleOptionChange(e, 'skip', option.optionId)}
        style={{ width: '18%' }}
        // ref={refs.title}
      />
      <IconButton
        aria-label="delete"
        className={classes.deleteButton}
        disabled={idx < 2 ? true : false}
        onClick={(e) => removeOption(e, option.optionId)}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

const QuestionChoice = React.forwardRef(({ quest, handleChange, classes, error }, ref) => {
  const [options, setOptions] = useState([
    { optionId: 1, value: '네', skip: '' },
    { optionId: 2, value: '아니오', skip: '' },
  ]);

  const lenRef = useRef();
  useEffect(() => {
    const el = lenRef.current.querySelector('input[type="number"]');
    el.min = 1;
    el.max = options.length;
  }, [options]);

  useImperativeHandle(
    ref,
    () => ({
      getOptions: () => options,
    }),
    [options],
  );

  const appendOptions = () => {
    const max = options.map((o) => o.optionId).reduce((a, b) => Math.max(a, b));
    const newObj = { optionId: max + 1, value: '', skip: '' };
    setOptions([...options, newObj]);
  };

  const removeOption = (e, optionId) => {
    const op = options.find((o) => o.optionId === optionId);
    const idx = options.indexOf(op);
    const newOptions = [...options];
    newOptions.splice(idx, 1);
    setOptions(newOptions);
  };

  const handleOptionChange = (e, field, optionId) => {
    const op = options.find((o) => o.optionId === optionId);
    const idx = options.indexOf(op);
    const newOptions = [...options];
    newOptions.splice(idx, 1, { ...op, [field]: e.target.value });
    setOptions(newOptions);
  };

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
        value={quest.len ? quest.len : 1}
        onChange={(e) => handleChange(e, 'len', quest.no)}
        ref={lenRef}
      />

      {options &&
        options.map((o, i) => (
          <Selectable
            key={o.optionId}
            idx={i}
            classes={classes}
            handleChange={handleChange}
            handleOptionChange={handleOptionChange}
            removeOption={removeOption}
            quest={quest}
            option={o}
          />
        ))}

      <div className={'MuiFormControl-marginNormal ' + classes.buttonWrap}>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          className={classes.functionalButton}
          to="/survey/create/main-setting"
          onClick={appendOptions}
        >
          선택지 추가
        </Button>
      </div>
    </div>
  );
});

export default QuestionChoice;

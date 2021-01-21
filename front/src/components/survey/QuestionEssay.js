import React from 'react';

import { CssTextField } from '../../lib/styles/mainStyle';

const QuestionEssay = ({ quest, options, handleChange, error }) => {
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
    </div>
  );
};

export default QuestionEssay;

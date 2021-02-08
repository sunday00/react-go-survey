import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { read } from '../../modules/survey';

const ReadContainer = ({ match }) => {
  const surveyNo = match.params.surveyNo;
  const dispatch = useDispatch();
  const survey = useSelector((state) => state.survey);

  useEffect(() => {
    if (!survey.main.title) dispatch(read(surveyNo));
  }, [dispatch, survey.main.title, surveyNo]);

  return <div>read</div>;
};

export default ReadContainer;

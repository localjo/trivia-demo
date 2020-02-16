import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { partition, isNil } from 'lodash';
import { IAppState, IStatus, IQuestion } from '../types';
import { setStatus } from '../redux/actions';

const Intro = () => {
  const dispatch = useDispatch();
  const questions: IQuestion[] = useSelector((state: IAppState) => {
    return state.questions;
  });
  const [answered] = partition(questions, q => !isNil(q.is_correct));
  async function resetQuiz() {
    dispatch(setStatus(IStatus.INIT));
  }
  useEffect(() => {
    if (answered.length > 0) resetQuiz();
  });
  return (
    <>
      <h1>Welcome to the Triva Challenge!</h1>
      <p>You will be presented with 10 True or False questions.</p>
      <p>Can you score 100%?</p>
      <Link to="/quiz/1">Begin</Link>
    </>
  );
};

export default Intro;

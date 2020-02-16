import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { partition, isNil } from 'lodash';

import Question from './Question';
import { IQuestion, IAppState } from '../types';

const Results = () => {
  const questions: IQuestion[] = useSelector((state: IAppState) => {
    return state.questions;
  });
  const total = questions.length;
  const [answered] = partition(questions, q => !isNil(q.is_correct));
  const isFinished = answered.length === total;
  if (!isFinished) {
    return <Redirect to={`/quiz/${answered.length + 1}`} />;
  }
  const [correct] = partition(questions, q => q.is_correct === true);
  return (
    <>
      <h1>
        You scored
        <br />
        {correct.length} / {total}
      </h1>
      <ul>
        {questions.map(q => {
          return <Question key={q.question} {...q} />;
        })}
      </ul>
      <Link to="/">Play again?</Link>
    </>
  );
};

export default Results;

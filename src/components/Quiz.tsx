import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { partition, isNil } from 'lodash';
import Question from './Question';
import { IQuestion, IAppState } from '../types';

interface RouteParams {
  questionIndex: string;
}

const Quiz = () => {
  const { questionIndex } = useParams<RouteParams>();
  const questions: IQuestion[] = useSelector((state: IAppState) => {
    return state.questions;
  });
  const total = questions.length;
  const [answered, unanswered] = partition(
    questions,
    q => !isNil(q.is_correct)
  );
  const isFinished = answered.length === total;
  if (isFinished) return <Redirect to="/results" />;
  const isCurrentQuestion = +questionIndex === answered.length + 1;
  if (!isCurrentQuestion) {
    return <Redirect to={`/quiz/${answered.length + 1}`} />;
  }
  const [correct] = partition(questions, q => q.is_correct === true);
  const current: IQuestion = questions[+questionIndex - 1];
  if (!current)
    return (
      <p>Oops, the question failed to load! Reload the quiz to try again.</p>
    );
  return (
    <>
      <p>
        Answered: {answered.length}/{unanswered.length}
      </p>
      <Question {...current} />
      <p>
        Correct: {correct.length || 0}/{total}
      </p>
    </>
  );
};

export default Quiz;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { partition, isNil } from 'lodash';
import ReactHtmlParser from 'react-html-parser';
import { submitAnswer } from '../redux/actions';
import { IQuestion, IAppState } from '../types';

interface RouteParams {
  questionIndex: string;
}

const Quiz = () => {
  const dispatch = useDispatch();
  const { questionIndex } = useParams<RouteParams>();
  const questions: IQuestion[] = useSelector((state: IAppState) => {
    return state.questions;
  });
  const total = questions.length;
  const [answered] = partition(questions, q => !isNil(q.is_correct));
  const isFinished = answered.length === total;
  if (isFinished) return <Redirect to="/results" />;
  const isCurrentQuestion = +questionIndex === answered.length + 1;
  if (!isCurrentQuestion) {
    return <Redirect to={`/quiz/${answered.length + 1}`} />;
  }
  const current: IQuestion = questions[+questionIndex - 1];
  if (!current)
    return (
      <p>Oops, the question failed to load! Reload the quiz to try again.</p>
    );
  const answerQuestion = (answer: boolean) => {
    dispatch(submitAnswer(answer, current.question));
  };
  return (
    <>
      <h1>{current.category}</h1>
      <p>{ReactHtmlParser(current.question)}</p>
      <button onClick={() => answerQuestion(true)}>True</button>
      <button onClick={() => answerQuestion(false)}>False</button>
      <p>
        {questionIndex} of {total}
      </p>
    </>
  );
};

export default Quiz;

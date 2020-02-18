import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { partition, isNil } from 'lodash';
import { submitAnswer } from '../redux/actions';
import { IQuestion, IAppState } from '../types';
import QuestionCard from './QuestionCard';

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
  const { question, category }: IQuestion = questions[+questionIndex - 1];
  if (!question)
    return (
      <p>Oops, the question failed to load! Reload the quiz to try again.</p>
    );
  const answerQuestion = (answer: boolean) => {
    dispatch(submitAnswer(answer, question));
  };
  return (
    <>
      <h1>{category}</h1>
      <QuestionCard question={question} answerQuestion={answerQuestion} />
      <p>
        {questionIndex} of {total}
      </p>
    </>
  );
};

export default Quiz;

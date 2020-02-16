import React from 'react';
import { useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { submitAnswer } from '../redux/actions';
import { IQuestion } from '../types';

interface RouteParams {
  questionIndex: string;
}

const Question = ({ question, is_correct }: IQuestion) => {
  const dispatch = useDispatch();
  const answerQuestion = (answer: boolean) => {
    dispatch(submitAnswer(answer, question));
  };
  return (
    <li className={is_correct ? 'correct' : ''}>
      {ReactHtmlParser(question)}
      <button onClick={() => answerQuestion(true)}>True</button>
      <button onClick={() => answerQuestion(false)}>False</button>
    </li>
  );
};

export default Question;

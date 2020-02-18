import React from 'react';
import ReactHtmlParser from 'react-html-parser';

interface IQuestionCard {
  question: string;
  answerQuestion: Function;
}

const QuestionCard = ({ question, answerQuestion }: IQuestionCard) => {
  return (
    <>
      <p>{ReactHtmlParser(question)}</p>
      <button onClick={() => answerQuestion(true)}>True</button>
      <button onClick={() => answerQuestion(false)}>False</button>
    </>
  );
};

export default QuestionCard;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import { partition, isNil } from 'lodash';
import { submitAnswer } from '../redux/actions';
import { IQuestion, IAppState } from '../types';
import QuestionCard from './QuestionCard';
import QuizProgress from './QuizProgress';

interface RouteParams {
  questionIndex: string;
}

const Quiz = () => {
  const dispatch = useDispatch();
  const { questionIndex } = useParams<RouteParams>();
  const index: number = +questionIndex;
  const questions: IQuestion[] = useSelector((state: IAppState) => {
    return state.questions;
  });
  const total: number = questions.length;
  const [answered] = partition(questions, q => !isNil(q.is_correct));
  const percentComplete: number = ((index - 1) / total) * 100;
  if (percentComplete >= 100) return <Redirect to="/results" />;
  const isCurrentQuestion = index === answered.length + 1;
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
      <LinearProgress
        variant="determinate"
        value={percentComplete}
        color="secondary"
        style={{ position: 'fixed', top: 0, left: 0, right: 0 }}
      />
      <Typography variant="h4" component="h2">
        {category}
      </Typography>
      <Box py="1em">
        <QuestionCard question={question} answerQuestion={answerQuestion} />
      </Box>
      <QuizProgress completed={index} total={total} />
    </>
  );
};

export default Quiz;

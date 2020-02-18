import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { partition, isNil } from 'lodash';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { IAppState, IStatus, IQuestion } from '../types';
import { setStatus } from '../redux/actions';

const Intro = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
      <Typography variant="h2" component="h1">
        Welcome to the Triva Challenge!
      </Typography>
      <Box py="3em" />
      <Typography variant="h4" component="p">
        You will be presented with 10 True or False questions.
      </Typography>
      <Box py="3em" />
      <Typography variant="h4" component="p">
        Can you score 100%?
      </Typography>
      <Box py="3em" />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => history.push('/quiz/1')}
      >
        Begin
      </Button>
    </>
  );
};

export default Intro;

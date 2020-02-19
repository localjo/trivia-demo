import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { partition, isNil } from 'lodash';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { IAppState, IStatus, IQuestion } from '../types';
import { setStatus } from '../redux';

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
      <Typography variant="h4" component="h1" color="primary">
        Welcome to the Triva Challenge!
      </Typography>
      <Box py="1em">
        <Typography variant="h5" component="p">
          You will be presented with 10 True or False questions.
        </Typography>
      </Box>
      <Typography variant="h5" component="p">
        Can you score 100%?
      </Typography>
      <Box py="3em">
        <Fab
          variant="extended"
          color="primary"
          size="large"
          onClick={() => history.push('/quiz/1')}
        >
          Begin&nbsp;
          <PlayCircleFilledIcon />
        </Fab>
      </Box>
      <LinearProgress
        variant="determinate"
        value={0}
        color="primary"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '1px' }}
      />
    </>
  );
};

export default Intro;

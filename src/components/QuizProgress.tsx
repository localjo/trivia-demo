import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

interface IQuestionCard {
  question: string;
  answerQuestion: Function;
}

const QuizProgress = (props: { completed: number; total: number }) => {
  const percentComplete: number = ((props.completed - 1) / props.total) * 100;
  const useStylesFacebook = makeStyles({
    root: {
      position: 'relative',
      textAlign: 'center',
      width: '100px',
      margin: '0 auto',
    },
    top: {
      position: 'absolute',
      left: 0,
    },
    bottom: {
      position: 'absolute',
      left: 0,
      color: 'rgba(0,0,0,0.1)',
    },
    label: { position: 'relative', top: '62px' },
  });
  const classes = useStylesFacebook();
  return (
    <div className={classes.root}>
      <Typography variant="body1" component="p" className={classes.label}>
        {props.completed} of {props.total}
      </Typography>
      <CircularProgress
        variant="static"
        className={classes.bottom}
        value={100}
        thickness={2}
        size={100}
      ></CircularProgress>
      <CircularProgress
        variant="static"
        color="secondary"
        className={classes.top}
        value={percentComplete + 5}
        thickness={2}
        size={100}
      ></CircularProgress>
    </div>
  );
};

export default QuizProgress;

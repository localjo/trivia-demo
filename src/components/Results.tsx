import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import partition from 'lodash/partition';
import isNil from 'lodash/isNil';
import ReactHtmlParser from 'react-html-parser';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import ReplayIcon from '@material-ui/icons/Replay';

import { IQuestion, IAppState } from '../types';

const Results = () => {
  const history = useHistory();
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
      <Typography variant="h4" component="h2">
        You scored {correct.length} / {total}
      </Typography>
      <Box py="1em">
        <Card
          variant="outlined"
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <CardContent>
            <List dense>
              {questions.map(q => {
                return (
                  <ListItem key={q.question}>
                    <ListItemIcon>
                      {q.is_correct ? (
                        <AddCircleIcon color="primary" />
                      ) : (
                        <RemoveCircleIcon color="secondary" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={ReactHtmlParser(q.question)}
                      secondary={`Correct answer: ${q.correct_answer}.`}
                    />
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </Box>
      <Box py="2em">
        <Fab
          variant="extended"
          color="primary"
          size="large"
          onClick={() => history.push('/')}
        >
          Play again?&nbsp;
          <ReplayIcon />
        </Fab>
      </Box>
      <LinearProgress
        variant="determinate"
        value={100}
        color="primary"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '1px' }}
      />
    </>
  );
};

export default Results;

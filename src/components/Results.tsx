import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { partition, isNil } from 'lodash';
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
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

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
      <Typography variant="h2" component="h2">
        You scored {correct.length} / {total}
      </Typography>
      <Box py="3em">
        <Card>
          <CardContent>
            <List>
              {questions.map(q => {
                const tip: string = !q.is_correct
                  ? `The correct answer was ${q.correct_answer}.`
                  : '';
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
                      secondary={tip}
                    />
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => history.push('/')}
      >
        Play again?
      </Button>
    </>
  );
};

export default Results;

import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';

interface IQuestionCard {
  question: string;
  answerQuestion: Function;
}

const QuestionCard = ({ question, answerQuestion }: IQuestionCard) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box py="2em">
          <Typography variant="h5" component="p">
            {ReactHtmlParser(question)}
          </Typography>
        </Box>
        <ButtonGroup variant="contained" color="secondary" size="large">
          <Button onClick={() => answerQuestion(true)}>True</Button>
          <Button onClick={() => answerQuestion(false)}>False</Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;

import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
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
        <Box
          py="0.4em"
          style={{
            minHeight: '160px',
          }}
        >
          <Typography variant="h5" component="p">
            {ReactHtmlParser(question)}
          </Typography>
        </Box>
        <CardActions style={{ display: 'block' }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => answerQuestion(true)}
          >
            True
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => answerQuestion(false)}
          >
            False
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;

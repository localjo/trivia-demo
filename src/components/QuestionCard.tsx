import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Fab from '@material-ui/core/Fab';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';

interface IQuestionCard {
  question: string;
  answerQuestion: Function;
}

const QuestionCard = ({ question, answerQuestion }: IQuestionCard) => {
  return (
    <Card
      className="card"
      variant="outlined"
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <CardContent>
        <Box
          py="0.4em"
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          minHeight={160}
          textAlign={'center'}
        >
          <Typography variant="h5" component="p">
            {ReactHtmlParser(question)}
          </Typography>
        </Box>
        <CardActions style={{ display: 'block' }}>
          <Fab
            variant="extended"
            color="primary"
            onClick={() => answerQuestion(true)}
          >
            True&nbsp;
            <ThumbUpIcon />
          </Fab>{' '}
          <Fab
            variant="extended"
            color="primary"
            onClick={() => answerQuestion(false)}
          >
            False&nbsp;
            <ThumbDownIcon />
          </Fab>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;

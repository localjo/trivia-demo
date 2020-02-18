import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Button from '@material-ui/core/Button';
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
    <Card variant="outlined" style={{ maxWidth: '600px', margin: '0 auto' }}>
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
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => answerQuestion(true)}
            startIcon={<ThumbUpIcon />}
          >
            True
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => answerQuestion(false)}
            startIcon={<ThumbDownIcon />}
          >
            False
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;

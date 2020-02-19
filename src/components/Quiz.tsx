import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, useParams, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import CategoryIcon from '@material-ui/icons/Category';
import { partition, isNil } from 'lodash';
import { CSSTransition } from 'react-transition-group';
import { submitAnswer } from '../redux';
import { IQuestion, IAppState } from '../types';
import QuestionCard from './QuestionCard';
import QuizProgress from './QuizProgress';

interface RouteParams {
  questionIndex: string;
}

const Quiz = () => {
  const dispatch = useDispatch();
  const { questionIndex } = useParams<RouteParams>();
  const history = useHistory();
  const index: number = +questionIndex;
  const questions: IQuestion[] = useSelector((state: IAppState) => {
    return state.questions;
  });
  const total: number = questions.length;
  const [answered] = partition(questions, q => !isNil(q.is_correct));
  const isCurrentQuestion = index === answered.length + 1;
  const percentComplete: number = ((index - 1) / total) * 100;
  const isLastAnswer = !isCurrentQuestion && index === total;
  useEffect(() => {
    if (isLastAnswer) {
      history.push(`/results`);
    } else if (!isCurrentQuestion) {
      history.push(`/quiz/${answered.length + 1}`);
    }
  }, [answered.length, history, isCurrentQuestion, isLastAnswer]);
  const { question, category }: IQuestion = questions[+questionIndex - 1];
  if (!question)
    return (
      <p>Oops, the question failed to load! Reload the quiz to try again.</p>
    );
  const answerQuestion = (answer: boolean) => {
    dispatch(submitAnswer({ answer, question }));
  };
  return (
    <>
      <Box pb="1em" style={{ minHeight: '400px' }}>
        {questions.map((card, i) => {
          return (
            <Route key={i} exact path={`/quiz/${i + 1}`}>
              {({ match }) => {
                const isIn = match != null;
                return (
                  <CSSTransition
                    in={isIn}
                    timeout={1000}
                    classNames="question"
                    unmountOnExit
                  >
                    <Box pb="1em" key={i} className="question">
                      <div className="category">
                        <Typography variant="h4" component="h2" color="primary">
                          <CategoryIcon color="secondary" /> {category}
                        </Typography>
                      </div>
                      <QuestionCard
                        question={card.question}
                        answerQuestion={answerQuestion}
                      />
                    </Box>
                  </CSSTransition>
                );
              }}
            </Route>
          );
        })}
      </Box>
      <QuizProgress completed={index} total={total} />
      <LinearProgress
        variant="determinate"
        value={percentComplete}
        color="primary"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '1px' }}
      />
    </>
  );
};

export default Quiz;

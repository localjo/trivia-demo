import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { addQuestions, setStatus } from './redux/actions';
import Intro from './components/Intro';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { IAppState, IStatus } from './types';

const App = () => {
  const status: IStatus = useSelector((state: IAppState) => {
    return state.status;
  });
  const dispatch = useDispatch();
  async function fetchData() {
    if (status === IStatus.INIT) {
      dispatch(setStatus(IStatus.LOADING));
      const res = await fetch(
        'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'
      );
      res.json().then(res => {
        dispatch(addQuestions((res as any).results));
        dispatch(setStatus(IStatus.LOADED));
      });
    }
  }
  useEffect(() => {
    fetchData();
  });
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/quiz/:questionIndex">
            {status === IStatus.LOADED ? <Quiz /> : <p>{IStatus[status]}</p>}
          </Route>
          <Route path="/results" component={Results} />
          <Route path="/" component={Intro} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

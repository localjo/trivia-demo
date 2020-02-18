import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
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
  let theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#2D7FF9', // G2i Blue
      },
      secondary: {
        main: '#E23E2F', // G2i Red
      },
      background: {
        default: '#1E1E1E',
      },
    },
    typography: {
      fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(
        ','
      ),
    },
    overrides: {
      MuiTypography: {
        h4: {
          minHeight: '2.4em',
        },
      },
    },
  });
  theme = responsiveFontSizes(theme);
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container fixed>
          <Box textAlign="center" marginTop="3em">
            <Router>
              <Switch>
                <Route path="/quiz/:questionIndex">
                  {status === IStatus.LOADED ? (
                    <Quiz />
                  ) : (
                    <CircularProgress color="primary" />
                  )}
                </Route>
                <Route path="/results" component={Results} />
                <Route path="/" component={Intro} />
              </Switch>
            </Router>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default App;

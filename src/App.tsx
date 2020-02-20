import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import Particles from 'react-particles-js';
import particlesConfig from './particlesjs-config.json';
import { addQuestions, setStatus } from './redux';
import Intro from './components/Intro';
import Quiz from './components/Quiz';
import Results from './components/Results';
import NotFound from './components/NotFound';
import CircularProgress from '@material-ui/core/CircularProgress';
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
      fontFamily: ['Neucha', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(
        ','
      ),
    },
    overrides: {
      MuiTypography: {
        h4: {
          minHeight: '2.7em',
        },
      },
      MuiCardContent: {
        root: {
          padding: '24px',
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Particles
        params={particlesConfig as any}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}
      />
      <Container fixed>
        <Box textAlign="center" marginTop="3em">
          <Router basename={`${process.env.PUBLIC_URL}/`}>
            <Switch>
              <Route exact path="/" component={Intro} />
              <Route exact path="/quiz/:questionIndex">
                {status === IStatus.LOADED ? (
                  <Quiz />
                ) : (
                  <CircularProgress color="primary" />
                )}
              </Route>
              <Route exact path="/results" component={Results} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;

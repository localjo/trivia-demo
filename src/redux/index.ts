import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppState, IQuestion, IStatus } from '../types';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('triviaState');
    if (!serializedState)
      return {
        status: IStatus.INIT,
        questions: [],
      };
    else return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: IAppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('triviaState', serializedState);
  } catch (err) {
    console.log(err);
  }
};

const initialState: IAppState = loadState();

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<IStatus>) {
      state.status = action.payload;
      if (action.payload === IStatus.INIT) {
        state.questions = [];
      }
    },
    addQuestions(state, action: PayloadAction<IQuestion[]>) {
      state.questions = action.payload;
    },
    submitAnswer(
      state,
      action: PayloadAction<{ question: string; answer: boolean }>
    ) {
      state.questions = state.questions.map((q: IQuestion) => {
        const isCurrentQuestion = q.question === action.payload.question;
        if (isCurrentQuestion && q.type === 'boolean') {
          switch (q.type) {
            case 'boolean':
              const { correct_answer } = q;
              const correctBool = /true/i.test(correct_answer);
              q.is_correct = correctBool === action.payload.answer;
              break;
            default:
              q.is_correct = false; // Answer not verified
          }
        }
        return q;
      });
    },
  },
});

export const store = configureStore({ reducer: quizSlice.reducer });
store.subscribe(() => {
  saveState(store.getState());
});

export const { setStatus, addQuestions, submitAnswer } = quizSlice.actions;
export default quizSlice.reducer;

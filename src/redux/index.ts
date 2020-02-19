import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppState, IQuestion, IStatus } from '../types';

const initialState: IAppState = {
  status: IStatus.INIT,
  questions: [],
};

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

export const { setStatus, addQuestions, submitAnswer } = quizSlice.actions;
export default quizSlice.reducer;

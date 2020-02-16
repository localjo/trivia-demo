import { AnyAction } from 'redux';
import {
  ADD_QUESTIONS,
  SUBMIT_ANSWER,
  SET_STATUS,
} from '../constants/action-types';
import { IAppState, IQuestion, IStatus } from '../../types';

const initialState: IAppState = {
  status: IStatus.INIT,
  questions: [],
};

function rootReducer(state = initialState, action: AnyAction) {
  if (action.type === SET_STATUS) {
    return Object.assign({}, state, {
      status: action.payload,
      questions: action.payload === IStatus.INIT ? [] : state.questions,
    });
  }
  if (action.type === ADD_QUESTIONS) {
    return Object.assign({}, state, {
      questions: (state.questions as IQuestion[]).concat(action.payload),
    });
  }
  if (action.type === SUBMIT_ANSWER) {
    return Object.assign({}, state, {
      questions: state.questions.map((q: IQuestion) => {
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
      }),
    });
  }
  return state;
}

export default rootReducer;

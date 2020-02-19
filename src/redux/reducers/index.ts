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
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
        questions: action.payload === IStatus.INIT ? [] : state.questions,
      };
    case ADD_QUESTIONS:
      return {
        ...state,
        questions: (state.questions as IQuestion[]).concat(action.payload),
      };
    case SUBMIT_ANSWER:
      return {
        ...state,
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
      };
    default:
      return state;
  }
}

export default rootReducer;

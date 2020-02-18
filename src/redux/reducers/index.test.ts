import reducer from '.';
import {
  ADD_QUESTIONS,
  SUBMIT_ANSWER,
  SET_STATUS,
} from '../constants/action-types';
import { IStatus } from '../../types';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      status: IStatus.INIT,
      questions: [],
    });
  });
  it('should handle SET_STATUS', () => {
    expect(
      reducer(
        {
          status: IStatus.LOADED,
          questions: [
            {
              question: 'Text',
              category: 'Text',
              difficulty: 'easy',
              type: 'boolean',
              correct_answer: 'True',
            },
            {
              question: 'Text2',
              category: 'Text',
              difficulty: 'easy',
              type: 'boolean',
              correct_answer: 'True',
            },
          ],
        },
        {
          type: SET_STATUS,
          payload: IStatus.INIT,
        }
      )
    ).toEqual({
      status: IStatus.INIT,
      questions: [],
    });
  });
  it('should handle ADD_QUESTIONS', () => {
    expect(
      reducer(
        {
          status: IStatus.INIT,
          questions: [],
        },
        {
          type: ADD_QUESTIONS,
          payload: [
            {
              question: 'Text',
              category: 'Text',
              difficulty: 'easy',
              type: 'boolean',
              correct_answer: 'True',
            },
            {
              question: 'Text2',
              category: 'Text',
              difficulty: 'easy',
              type: 'boolean',
              correct_answer: 'True',
            },
          ],
        }
      )
    ).toEqual({
      status: IStatus.INIT,
      questions: [
        {
          question: 'Text',
          category: 'Text',
          difficulty: 'easy',
          type: 'boolean',
          correct_answer: 'True',
        },
        {
          question: 'Text2',
          category: 'Text',
          difficulty: 'easy',
          type: 'boolean',
          correct_answer: 'True',
        },
      ],
    });
  });
  it('should handle SUBMIT_ANSWER', () => {
    expect(
      reducer(
        {
          status: IStatus.INIT,
          questions: [
            {
              question: 'Text',
              category: 'Text',
              difficulty: 'easy',
              type: 'boolean',
              correct_answer: 'True',
            },
            {
              question: 'Text2',
              category: 'Text',
              difficulty: 'easy',
              type: 'boolean',
              correct_answer: 'True',
            },
          ],
        },
        {
          type: SUBMIT_ANSWER,
          payload: {
            question: 'Text',
            answer: true,
          },
        }
      )
    ).toEqual({
      status: IStatus.INIT,
      questions: [
        {
          question: 'Text',
          category: 'Text',
          difficulty: 'easy',
          is_correct: true,
          type: 'boolean',
          correct_answer: 'True',
        },
        {
          question: 'Text2',
          category: 'Text',
          difficulty: 'easy',
          type: 'boolean',
          correct_answer: 'True',
        },
      ],
    });
  });
});

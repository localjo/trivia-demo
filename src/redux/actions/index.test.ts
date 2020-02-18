import { setStatus, addQuestions, submitAnswer } from '.';
import {
  ADD_QUESTIONS,
  SUBMIT_ANSWER,
  SET_STATUS,
} from '../constants/action-types';
import { IQuestion, IStatus } from '../../types';

describe('actions', () => {
  it('should create an action to add questions', () => {
    const questions: IQuestion[] = [
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
    ];
    const expectedAction = {
      type: ADD_QUESTIONS,
      payload: questions,
    };
    expect(addQuestions(questions)).toEqual(expectedAction);
  });
  it('should create an action to submit an answer', () => {
    const question = 'Test';
    const answer = true;
    const expectedAction = {
      type: SUBMIT_ANSWER,
      payload: { answer, question },
    };
    expect(submitAnswer(answer, question)).toEqual(expectedAction);
  });
  it('should create an action to set quiz status', () => {
    const status = IStatus.INIT;
    const expectedAction = {
      type: SET_STATUS,
      payload: status,
    };
    expect(setStatus(status)).toEqual(expectedAction);
  });
});

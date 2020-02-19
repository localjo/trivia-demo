import reducer from '.';
import { IStatus } from '../types';
import { setStatus, addQuestions, submitAnswer } from '.';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      status: IStatus.INIT,
      questions: [],
    });
  });
  it('should handle setStatus', () => {
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
        setStatus(IStatus.INIT)
      )
    ).toEqual({
      status: IStatus.INIT,
      questions: [],
    });
  });
  it('should handle addQuestions', () => {
    expect(
      reducer(
        {
          status: IStatus.INIT,
          questions: [],
        },
        addQuestions([
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
        ])
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
  it('should handle submitAnswer', () => {
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
        submitAnswer({
          question: 'Text',
          answer: true,
        })
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

import {
  ADD_QUESTIONS,
  SUBMIT_ANSWER,
  SET_STATUS,
} from '../constants/action-types';
import { IQuestion, IStatus } from '../../types';

export function setStatus(payload: IStatus) {
  return { type: SET_STATUS, payload };
}

export function addQuestions(payload: IQuestion[]) {
  return { type: ADD_QUESTIONS, payload };
}

export function submitAnswer(answer: any, question: string) {
  const payload = { answer, question };
  return { type: SUBMIT_ANSWER, payload };
}

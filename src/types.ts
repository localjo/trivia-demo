export interface IAppState {
  status: IStatus;
  questions: IQuestion[];
}
export enum IStatus {
  INIT,
  LOADING,
  LOADED,
}
export interface IQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  is_correct?: boolean;
}

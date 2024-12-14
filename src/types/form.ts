export type QuestionType = 'text' | 'single-choice' | 'multiple-choice';

export interface Option {
  id: string;
  label: string;
  value: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  type: QuestionType;
  options?: Option[];
  validation?: {
    required?: boolean;
    pattern?: string;
    message?: string;
  };
  prefilledValue?: string | string[];
}

export interface FormResponse {
  questionId: string;
  answer: string | string[];
}

export interface FormState {
  currentQuestion: Question;
  isComplete: boolean;
  error?: string;
  history: Question[];
  answer?: string | string[];
}

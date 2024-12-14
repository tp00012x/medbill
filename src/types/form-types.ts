import { Question } from './form';

export interface QuestionFormProps {
  question: Question;
  onSubmit: (answer: string | string[]) => void;
  onBack: () => void;
  error: string | null;
  showBack: boolean;
  answer?: string | string[];
}

export type QuestionFormContentProps = Omit<QuestionFormProps, 'error'>;

import { QuestionFormContentProps, QuestionFormProps } from '../types/form-types';
import MultipleChoiceForm from './ui/MultipleChoiceForm';
import SingleChoiceForm from './ui/SingleChoiceForm';
import TextQuestionForm from './ui/TextQuestionForm';

function QuestionFormContent({
  question,
  onSubmit,
  answer,
  onBack,
  showBack,
}: QuestionFormContentProps) {
  switch (question.type) {
    case 'text':
      return (
        <TextQuestionForm
          question={question}
          onSubmit={onSubmit}
          answer={answer}
          onBack={onBack}
          showBack={showBack}
        />
      );
    case 'single-choice':
      return (
        <SingleChoiceForm
          question={question}
          onSubmit={onSubmit}
          answer={answer}
          onBack={onBack}
          showBack={showBack}
        />
      );
    case 'multiple-choice':
      return (
        <MultipleChoiceForm
          question={question}
          onSubmit={onSubmit}
          answer={answer}
          onBack={onBack}
          showBack={showBack}
        />
      );
    default:
      throw new Error(`Unsupported question type: ${question.type}`);
  }
}

export default function QuestionForm({
  question,
  onSubmit,
  onBack,
  error,
  showBack,
  answer,
}: QuestionFormProps) {
  return (
    <div className="space-y-6">
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      <QuestionFormContent
        question={question}
        onSubmit={onSubmit}
        answer={answer}
        onBack={onBack}
        showBack={showBack}
      />
    </div>
  );
}

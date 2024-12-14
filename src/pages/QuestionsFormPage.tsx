import { useEffect } from 'react';
import QuestionForm from '../components/QuestionForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useQuestions } from '../hooks/useQuestions';

export default function QuestionsFormPage() {
  const {
    formState,
    error,
    isLoading,
    fetchInitialQuestion,
    submitAnswer,
    navigateToPreviousQuestion,
  } = useQuestions();

  useEffect(() => {
    fetchInitialQuestion();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!formState) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <p className="text-red-500">Failed to load question. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {formState.isComplete ? (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Thank you!</h2>
            <p className="text-gray-600">You have completed the questionnaire.</p>
          </div>
        ) : (
          <QuestionForm
            question={formState.currentQuestion}
            onSubmit={submitAnswer}
            onBack={navigateToPreviousQuestion}
            error={error}
            showBack={formState.history.length > 0}
            answer={formState.answer}
          />
        )}
      </div>
    </div>
  );
}

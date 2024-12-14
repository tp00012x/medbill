import { useState } from 'react';
import { questionService } from '../services/questionService';
import { FormState } from '../types/form';

export function useQuestions() {
  const [formState, setFormState] = useState<FormState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInitialQuestion = async () => {
    try {
      const initialState = await questionService.getInitialQuestion();
      setFormState(initialState);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load question');
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (answer: string | string[]) => {
    try {
      setError(null);
      setIsLoading(true);
      if (!formState) return;

      const newState = await questionService.submitAnswer({
        questionId: formState.currentQuestion.id,
        answer,
      });
      setFormState(newState);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToPreviousQuestion = async () => {
    if (!formState) return;
    try {
      setIsLoading(true);
      const newState = await questionService.getPreviousQuestion();
      setFormState(newState);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to go back');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formState,
    error,
    isLoading,
    fetchInitialQuestion,
    submitAnswer,
    navigateToPreviousQuestion,
  };
}

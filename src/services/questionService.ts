import { Question, FormResponse, FormState } from '../types/form';
import { delay } from '../utils/delay';

// This can be generated with AI as long as it satisfies the Question interface
const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'Personal Information',
    description: 'What is your full name?',
    type: 'text',
    validation: {
      required: true,
      message: 'Please enter your full name',
    },
  },
  {
    id: '2',
    title: 'Insurance Coverage',
    description: 'Select your insurance provider:',
    type: 'single-choice',
    options: [
      { id: '1', label: 'Blue Cross', value: 'blue_cross' },
      { id: '2', label: 'Aetna', value: 'aetna' },
      { id: '3', label: 'UnitedHealthcare', value: 'united' },
      { id: '4', label: 'Other', value: 'other' },
    ],
    validation: {
      required: true,
      message: 'Please select your insurance provider',
    },
  },
  {
    id: '3',
    title: 'Symptoms',
    description: 'Select all symptoms that apply:',
    type: 'multiple-choice',
    options: [
      { id: '1', label: 'Headache', value: 'headache' },
      { id: '2', label: 'Fever', value: 'fever' },
      { id: '3', label: 'Cough', value: 'cough' },
      { id: '4', label: 'Fatigue', value: 'fatigue' },
    ],
    validation: {
      required: true,
      message: 'Please select at least one symptom',
    },
  },
];

class QuestionService {
  private currentQuestionIndex = 0;
  private answers: Map<string, string | string[]> = new Map();

  private isAnswerEmpty(answer: string | string[]): boolean {
    return Array.isArray(answer) ? answer.length === 0 : !answer;
  }

  private validateRequiredAnswer(question: Question, answer: string | string[]) {
    const isRequired = question.validation?.required;
    if (!isRequired) return;

    switch (question.type) {
      case 'text':
        if (!answer || (typeof answer === 'string' && answer.trim() === '')) {
          throw new Error(question.validation?.message || 'This field is required');
        }
        break;

      case 'single-choice':
        if (!answer || (Array.isArray(answer) && (answer.length === 0 || answer[0] === ''))) {
          throw new Error(question.validation?.message || 'Please select an option');
        }
        break;

      case 'multiple-choice':
        if (!answer || (Array.isArray(answer) && answer.length === 0)) {
          throw new Error(question.validation?.message || 'Please select at least one option');
        }
        break;

      default:
        if (this.isAnswerEmpty(answer)) {
          throw new Error(question.validation?.message || 'This field is required');
        }
    }
  }

  async getInitialQuestion(): Promise<FormState> {
    await delay(500);

    return {
      currentQuestion: mockQuestions[0],
      isComplete: false,
      history: [],
      answer: this.answers.get(mockQuestions[0].id),
    };
  }

  async submitAnswer(response: FormResponse): Promise<FormState> {
    await delay(200);

    const currentQuestion = mockQuestions[this.currentQuestionIndex];
    this.validateRequiredAnswer(currentQuestion, response.answer);
    this.answers.set(currentQuestion.id, response.answer);
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= mockQuestions.length) {
      return {
        currentQuestion: mockQuestions[this.currentQuestionIndex - 1],
        isComplete: true,
        history: mockQuestions.slice(0, this.currentQuestionIndex),
        answer: response.answer,
      };
    }

    const nextQuestion = mockQuestions[this.currentQuestionIndex];
    return {
      currentQuestion: nextQuestion,
      isComplete: false,
      history: mockQuestions.slice(0, this.currentQuestionIndex),
      answer: this.answers.get(nextQuestion.id),
    };
  }

  async getPreviousQuestion(): Promise<FormState> {
    await delay(200);

    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }

    const question = mockQuestions[this.currentQuestionIndex];
    return {
      currentQuestion: question,
      isComplete: false,
      history: mockQuestions.slice(0, this.currentQuestionIndex),
      answer: this.answers.get(question.id),
    };
  }
}

export const questionService = new QuestionService();

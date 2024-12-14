import React, { useState } from 'react';
import { QuestionFormContentProps } from '../../types/form-types';

export default function SingleChoiceForm({
  question,
  onSubmit,
  answer,
  onBack,
  showBack,
}: QuestionFormContentProps) {
  const initialValue = Array.isArray(answer) ? answer[0] : '';
  const [selectedOption, setSelectedOption] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit([selectedOption]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">{question.title}</h2>
      <p className="text-gray-600">{question.description}</p>
      <div className="space-y-3">
        {question.options?.map((option) => (
          <label
            key={option.id}
            className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="radio"
              name="options"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="form-radio text-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-between space-x-4 mt-6">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Next
        </button>
      </div>
    </form>
  );
}

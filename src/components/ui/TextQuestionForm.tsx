import React, { useState } from 'react';

import { QuestionFormContentProps } from '../../types/form-types';

export default function TextQuestionForm({
  question,
  onSubmit,
  answer,
  onBack,
  showBack,
}: QuestionFormContentProps) {
  const [value, setValue] = useState(typeof answer === 'string' ? answer : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">{question.title}</h2>
      <p className="text-gray-600">{question.description}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Type your answer here..."
      />
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

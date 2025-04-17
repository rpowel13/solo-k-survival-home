
import React from 'react';

interface QuestionProgressProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

const QuestionProgress: React.FC<QuestionProgressProps> = ({
  currentQuestionIndex,
  totalQuestions,
}) => {
  const progress = Math.round(((currentQuestionIndex) / totalQuestions) * 100);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
        <p className="text-sm text-gray-500">Progress: {progress}%</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-survival-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuestionProgress;

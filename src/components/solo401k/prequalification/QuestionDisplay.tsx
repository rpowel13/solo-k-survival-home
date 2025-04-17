
import React from 'react';
import { Button } from '@/components/ui/button';
import { Question } from './types';

interface QuestionDisplayProps {
  question: Question;
  onAnswer: (answer: boolean) => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question, onAnswer }) => {
  return (
    <div className="space-y-6">
      <div className="my-8">
        <h3 className="text-xl font-medium mb-2">{question.text}</h3>
        {question.helpText && (
          <p className="text-gray-500 text-sm mb-6">{question.helpText}</p>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={() => onAnswer(true)} 
          className="bg-survival-600 hover:bg-survival-700"
          size="lg"
        >
          Yes
        </Button>
        <Button 
          onClick={() => onAnswer(false)} 
          variant="outline"
          size="lg"
          className="border-2"
        >
          No
        </Button>
      </div>
    </div>
  );
};

export default QuestionDisplay;


import React, { useState } from 'react';
import { Question, Result } from './types';
import QuestionDisplay from './QuestionDisplay';
import QuestionProgress from './QuestionProgress';
import ResultDisplay from './ResultDisplay';

interface PrequalificationQuizProps {
  questions: Question[];
  onComplete?: (result: Result) => void;
}

const PrequalificationQuiz: React.FC<PrequalificationQuizProps> = ({ 
  questions,
  onComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<Result>(null);

  const handleAnswer = (answer: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const eligibilityResult = determineEligibility(newAnswers);
      setResult(eligibilityResult);
      if (onComplete) {
        onComplete(eligibilityResult);
      }
    }
  };

  const determineEligibility = (answers: Record<string, boolean>): Result => {
    if (!answers.self_employment_income) {
      return 'not-eligible';
    }
    if (answers.no_full_time_employees) {
      return 'not-eligible';
    }
    if (!answers.business_type) {
      return 'maybe-eligible';
    }
    if (!answers.earned_income) {
      return 'not-eligible';
    }
    return 'eligible';
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="p-4">
      {result === null ? (
        <div className="space-y-4">
          <QuestionProgress
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
          />
          <QuestionDisplay
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        </div>
      ) : (
        <ResultDisplay result={result} onReset={resetQuiz} />
      )}
    </div>
  );
};

export default PrequalificationQuiz;

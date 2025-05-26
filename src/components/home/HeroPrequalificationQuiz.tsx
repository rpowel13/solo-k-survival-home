
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import QuestionProgress from "../solo401k/prequalification/QuestionProgress";
import QuestionDisplay from "../solo401k/prequalification/QuestionDisplay";
import ResultDisplay from "../solo401k/prequalification/ResultDisplay";
import { Button } from "@/components/ui/button";
import { Question, Result } from "../solo401k/prequalification/types";

const questions: Question[] = [
  {
    id: 'self_employment_income',
    text: 'Do you have self-employment income?',
    helpText: 'This includes income from your own business, freelancing, consulting, or other self-employed activities.',
  },
  {
    id: 'no_full_time_employees',
    text: 'Does your business have any full-time employees other than yourself or your spouse?',
    helpText: 'Full-time employees are those who work 1,000 hours or more per year (about 20 hours per week).',
  },
  {
    id: 'business_type',
    text: 'Is your business structured as a sole proprietorship, LLC, partnership, or corporation?',
    helpText: 'Most business entities qualify, but the structure may affect contribution options.',
  },
  {
    id: 'earned_income',
    text: 'Will you have earned income this year from your business?',
    helpText: 'You need earned income to make contributions to a Solo 401k.',
  },
];

const HeroPrequalificationQuiz: React.FC = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
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

  // Show a button to open the quiz, then show the quiz UI
  if (!isQuizOpen) {
    return (
      <div className="flex flex-col items-center mt-6">
        <Button
          size="lg"
          className="bg-survival-600 hover:bg-survival-700 shadow-md"
          onClick={() => setIsQuizOpen(true)}
        >
          See if you qualify for Solo 401k
        </Button>
      </div>
    );
  }

  return (
    <Card className="mt-8 border-2 border-survival-200 rounded-xl shadow-lg bg-white w-full max-w-xl mx-auto">
      <CardHeader className="bg-survival-50 rounded-t-xl">
        <CardTitle className="text-xl text-center text-survival-800">
          Solo 401k Eligibility Quiz
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Answer a few questions to see if you qualify for a Solo 401k plan.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {result === null ? (
          <div className="space-y-6">
            <QuestionProgress currentQuestionIndex={currentQuestionIndex} totalQuestions={questions.length} />
            <QuestionDisplay question={questions[currentQuestionIndex]} onAnswer={handleAnswer} />
          </div>
        ) : (
          <div className="py-6">
            <ResultDisplay result={result} onReset={resetQuiz} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HeroPrequalificationQuiz;

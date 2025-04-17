
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import QuestionProgress from './prequalification/QuestionProgress';
import QuestionDisplay from './prequalification/QuestionDisplay';
import ResultDisplay from './prequalification/ResultDisplay';
import { Question, Result } from './prequalification/types';

const PrequalificationSection = () => {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<Result>(null);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleAnswer = (answer: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      determineEligibility(newAnswers);
    }
  };

  const determineEligibility = (answers: Record<string, boolean>) => {
    if (!answers.self_employment_income) {
      setResult('not-eligible');
      return;
    }
    if (answers.no_full_time_employees) {
      setResult('not-eligible');
      return;
    }
    if (!answers.business_type) {
      setResult('maybe-eligible');
      return;
    }
    if (!answers.earned_income) {
      setResult('not-eligible');
      return;
    }
    setResult('eligible');
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
    toast({
      title: "Quiz Reset",
      description: "Start again to check your eligibility.",
    });
  };

  return (
    <section id="prequalification" className="my-12 flex justify-center items-center">
      <div className="w-full max-w-4xl px-4">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full mx-auto"
        >
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full lg:w-auto mb-6 border-2 border-survival-600 text-survival-800 hover:bg-survival-100 text-lg px-8 py-4 rounded-xl"
            >
              {isOpen ? "Hide Eligibility Quiz" : "Check Your Eligibility for a Solo 401k"}
              <ArrowRight className={`ml-2 h-5 w-5 transform transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="border-2 border-survival-200">
              <CardHeader className="bg-survival-50">
                <CardTitle className="text-2xl text-center text-survival-800">
                  Solo 401k Eligibility Quiz
                </CardTitle>
                <CardDescription className="text-center">
                  Answer a few questions to see if you qualify for a Solo 401k plan.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {result === null ? (
                  <div className="space-y-6">
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
                  <div className="py-6">
                    <ResultDisplay result={result} onReset={resetQuiz} />
                  </div>
                )}
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
};

export default PrequalificationSection;

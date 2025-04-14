
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type Question = {
  id: string;
  text: string;
  helpText?: string;
};

type Result = 'eligible' | 'not-eligible' | 'maybe-eligible' | null;

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
    // Must have self-employment income
    if (!answers.self_employment_income) {
      setResult('not-eligible');
      return;
    }

    // Cannot have full-time employees other than self/spouse
    if (answers.no_full_time_employees) {
      setResult('not-eligible');
      return;
    }

    // Must have a qualifying business structure
    if (!answers.business_type) {
      setResult('maybe-eligible');
      return;
    }

    // Must have earned income
    if (!answers.earned_income) {
      setResult('not-eligible');
      return;
    }

    // If all conditions are met
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
    <section id="prequalification" className="my-12">
      <div className="flex flex-col items-center justify-center">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full max-w-3xl mx-auto"
        >
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full lg:w-auto mb-6 border-2 border-survival-600 text-survival-800 hover:bg-survival-100"
            >
              {isOpen ? "Hide Eligibility Quiz" : "Check Your Eligibility for a Solo 401k"}
              <ArrowRight className={`ml-2 h-4 w-4 transform transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="border-2 border-survival-200">
              <CardHeader className="bg-survival-50">
                <CardTitle className="text-2xl text-center text-survival-800">Solo 401k Eligibility Quiz</CardTitle>
                <CardDescription className="text-center">
                  Answer a few questions to see if you qualify for a Solo 401k plan.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {result === null ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {questions.length}</p>
                      <p className="text-sm text-gray-500">Progress: {Math.round(((currentQuestionIndex) / questions.length) * 100)}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-survival-600 h-2.5 rounded-full transition-all duration-300" 
                        style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="my-8">
                      <h3 className="text-xl font-medium mb-2">{questions[currentQuestionIndex].text}</h3>
                      {questions[currentQuestionIndex].helpText && (
                        <p className="text-gray-500 text-sm mb-6">{questions[currentQuestionIndex].helpText}</p>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        onClick={() => handleAnswer(true)} 
                        className="bg-survival-600 hover:bg-survival-700"
                        size="lg"
                      >
                        Yes
                      </Button>
                      <Button 
                        onClick={() => handleAnswer(false)} 
                        variant="outline"
                        size="lg"
                        className="border-2"
                      >
                        No
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="py-6">
                    {result === 'eligible' && (
                      <div className="text-center space-y-6">
                        <div className="flex justify-center">
                          <div className="rounded-full bg-green-100 p-3 inline-block">
                            <CheckCircle2 className="h-12 w-12 text-green-600" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-green-700">You Appear to Qualify!</h3>
                        <p className="max-w-md mx-auto">
                          Based on your answers, you meet the basic requirements for a Solo 401k. 
                          You can proceed with your application.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                          <Button onClick={resetQuiz} variant="outline" className="border-2">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Start Over
                          </Button>
                          <Button 
                            className="bg-survival-600 hover:bg-survival-700"
                            onClick={() => window.location.href = '/apply/solo-401k'}
                          >
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {result === 'not-eligible' && (
                      <div className="text-center space-y-6">
                        <div className="flex justify-center">
                          <div className="rounded-full bg-red-100 p-3 inline-block">
                            <XCircle className="h-12 w-12 text-red-600" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-red-700">You May Not Qualify</h3>
                        <p className="max-w-md mx-auto">
                          Based on your answers, you may not meet the basic requirements for a Solo 401k.
                          Please contact us for a consultation to explore your options.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                          <Button onClick={resetQuiz} variant="outline" className="border-2">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Start Over
                          </Button>
                          <Button 
                            className="bg-survival-600 hover:bg-survival-700"
                            onClick={() => window.location.href = '/contact'}
                          >
                            Contact Us
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {result === 'maybe-eligible' && (
                      <div className="text-center space-y-6">
                        <div className="flex justify-center">
                          <div className="rounded-full bg-yellow-100 p-3 inline-block">
                            <CheckCircle2 className="h-12 w-12 text-yellow-600" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-yellow-700">You May Qualify</h3>
                        <p className="max-w-md mx-auto">
                          Based on your answers, you may qualify for a Solo 401k, but there are some 
                          factors that need further consideration. We recommend contacting us for a consultation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                          <Button onClick={resetQuiz} variant="outline" className="border-2">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Start Over
                          </Button>
                          <Button 
                            className="bg-survival-600 hover:bg-survival-700"
                            onClick={() => window.location.href = '/contact'}
                          >
                            Contact Us
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
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

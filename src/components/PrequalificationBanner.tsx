import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import QuestionProgress from './solo401k/prequalification/QuestionProgress';
import QuestionDisplay from './solo401k/prequalification/QuestionDisplay';
import ResultDisplay from './solo401k/prequalification/ResultDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Question, Result } from './solo401k/prequalification/types';
import { getZapierWebhookUrl } from '@/services/zapierConfigService';

interface PrequalificationBannerProps {
  className?: string;
}

const PrequalificationBanner: React.FC<PrequalificationBannerProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isOnSolo401kPage = location.pathname.includes('/services/solo-401k');

  // State for the quiz when displayed on the home page
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<Result>(null);

  // Log webhook configuration when component mounts - for validation
  useEffect(() => {
    console.log(`[${new Date().toISOString()}] PrequalificationBanner loading - current page: ${location.pathname}`);
    
    // Check if Zapier webhook is configured
    const webhookUrl = getZapierWebhookUrl('solo401k');
    console.log(`[${new Date().toISOString()}] Solo401k Zapier webhook URL: ${webhookUrl}`);
    
    if (webhookUrl === 'https://hooks.zapier.com/hooks/catch/your-webhook-id/') {
      console.warn(`[${new Date().toISOString()}] Solo401k is using the default webhook URL - CRM integration may not work`);
    }
  }, [location.pathname]);

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
    
    // Log eligibility result for Zapier webhook validation
    console.log(`[${new Date().toISOString()}] Quiz eligibility result: ${result}`);
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

  const handleEligibilityCheck = () => {
    if (isOnSolo401kPage) {
      // If already on the Solo401k page, scroll to the prequalification section
      const quizSection = document.getElementById('prequalification');
      if (quizSection) {
        console.log(`[${new Date().toISOString()}] Scrolling to prequalification section on Solo401k page`);
        quizSection.scrollIntoView({ behavior: 'smooth' });
        
        // Find and click the collapsible trigger button
        setTimeout(() => {
          const collapsibleTrigger = quizSection.querySelector('button');
          if (collapsibleTrigger && window.getComputedStyle(collapsibleTrigger).display !== 'none') {
            collapsibleTrigger.click();
          }
        }, 500); // Short delay to ensure smooth scrolling completes
      }
    } else {
      // If on home page, open the quiz directly
      console.log(`[${new Date().toISOString()}] Opening quiz on home page`);
      setIsQuizOpen(true);
    }
  };

  // Scroll to the contact form/result section after quiz completion (on home)
  useEffect(() => {
    if (result !== null && !isOnSolo401kPage) {
      const resultSection = document.getElementById('prequalification-result');
      if (resultSection) {
        setTimeout(() => {
          resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200); // Small delay to ensure DOM is updated
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, isOnSolo401kPage]);
  
  return (
    <section className={`bg-gradient-to-r from-survival-50 to-finance-50 py-16 border-y border-gray-100 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md mb-8">
            <CheckCircle className="h-5 w-5 text-survival-600" />
            <span className="text-base font-medium text-gray-700">Quick Eligibility Check</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-survival-800">See If You Qualify for a Solo 401k</h2>
          <p className="text-xl mb-8 text-gray-700">
            Answer a few quick questions to determine if you're eligible for the significant tax advantages and higher contribution limits of a Solo 401k plan.
          </p>
          <Button 
            size="lg" 
            className="bg-survival-600 hover:bg-survival-700 shadow-md hover:shadow-lg transition-all"
            onClick={handleEligibilityCheck}
          >
            Take the Eligibility Quiz
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          {!isOnSolo401kPage && (
            <div className="mt-8 w-full">
              <Collapsible
                open={isQuizOpen}
                onOpenChange={setIsQuizOpen}
                className="w-full mx-auto"
              >
                <CollapsibleContent>
                  <Card className="border-2 border-survival-200 rounded-xl shadow-lg bg-white transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                    <CardHeader className="bg-survival-50 rounded-t-xl">
                      <CardTitle className="text-2xl text-center text-survival-800">
                        Solo 401k Eligibility Quiz
                      </CardTitle>
                      <CardDescription className="text-center text-gray-600">
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
          )}
        </div>
      </div>
    </section>
  );
};

export default PrequalificationBanner;

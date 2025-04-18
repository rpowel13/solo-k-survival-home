
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface PrequalificationBannerProps {
  className?: string;
}

const PrequalificationBanner: React.FC<PrequalificationBannerProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnSolo401kPage = location.pathname.includes('/services/solo-401k');

  const handleEligibilityCheck = () => {
    if (isOnSolo401kPage) {
      // If already on the page, manually scroll and open
      const quizSection = document.getElementById('prequalification');
      if (quizSection) {
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
      // If on home page, navigate programmatically with state
      navigate('/services/solo-401k#prequalification', { 
        state: { openEligibilityQuiz: true } 
      });
    }
  };

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
        </div>
      </div>
    </section>
  );
};

export default PrequalificationBanner;

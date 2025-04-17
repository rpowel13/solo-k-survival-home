
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { Result } from './types';

interface ResultDisplayProps {
  result: Result;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const resultConfigs = {
    eligible: {
      icon: <CheckCircle2 className="h-12 w-12 text-green-600" />,
      bgColor: 'bg-green-100',
      title: 'You Appear to Qualify!',
      titleColor: 'text-green-700',
      description: 'Based on your answers, you meet the basic requirements for a Solo 401k. You can proceed with your application.',
      primaryAction: {
        text: 'Apply Now',
        href: '/apply/solo-401k',
      },
    },
    'not-eligible': {
      icon: <XCircle className="h-12 w-12 text-red-600" />,
      bgColor: 'bg-red-100',
      title: 'You May Not Qualify',
      titleColor: 'text-red-700',
      description: 'Based on your answers, you may not meet the basic requirements for a Solo 401k. Please contact us for a consultation to explore your options.',
      primaryAction: {
        text: 'Contact Us',
        href: '/contact',
      },
    },
    'maybe-eligible': {
      icon: <CheckCircle2 className="h-12 w-12 text-yellow-600" />,
      bgColor: 'bg-yellow-100',
      title: 'You May Qualify',
      titleColor: 'text-yellow-700',
      description: 'Based on your answers, you may qualify for a Solo 401k, but there are some factors that need further consideration. We recommend contacting us for a consultation.',
      primaryAction: {
        text: 'Contact Us',
        href: '/contact',
      },
    },
  };

  if (!result || !resultConfigs[result]) return null;

  const config = resultConfigs[result];

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className={`rounded-full ${config.bgColor} p-3 inline-block`}>
          {config.icon}
        </div>
      </div>
      <h3 className={`text-xl font-bold ${config.titleColor}`}>{config.title}</h3>
      <p className="max-w-md mx-auto">
        {config.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <Button onClick={onReset} variant="outline" className="border-2">
          <RefreshCw className="mr-2 h-4 w-4" />
          Start Over
        </Button>
        <Button 
          className="bg-survival-600 hover:bg-survival-700"
          onClick={() => window.location.href = config.primaryAction.href}
        >
          {config.primaryAction.text}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ResultDisplay;

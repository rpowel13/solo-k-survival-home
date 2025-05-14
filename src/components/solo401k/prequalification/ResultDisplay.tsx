
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { Result } from './types';
import { useToast } from '@/hooks/use-toast';

interface ResultDisplayProps {
  result: Result;
  onReset: () => void;
}

// vCita popup launcher
declare global {
  interface Window {
    vcita?: any;
  }
}

const openVCitaPopup = () => {
  // vCita script integration: open widget or fallback to direct link
  if (window.vcita && window.vcita.openLiveSiteWidget) {
    window.vcita.openLiveSiteWidget();
  } else {
    window.open('https://www.vcita.com/v/izk040b42jnjcf3c/contact?frontage_iframe=true&invite=vr_cf_pb-izk040b42jnjcf3c', '_blank');
  }
};

const resultConfigs = {
  eligible: {
    icon: <CheckCircle2 className="h-12 w-12 text-green-600" />,
    bgColor: 'bg-green-100',
    title: 'You Appear to Qualify!',
    titleColor: 'text-green-700',
    description:
      'Based on your answers, you meet the basic requirements for a Solo 401k. Click below to securely send us your info and get started with a quick consultation.',
    primaryAction: {
      text: 'Contact Us',
    },
  },
  'not-eligible': {
    icon: <XCircle className="h-12 w-12 text-red-600" />,
    bgColor: 'bg-red-100',
    title: 'You May Not Qualify',
    titleColor: 'text-red-700',
    description:
      'Based on your answers, you may not meet the basic requirements for a Solo 401k. For personalized help, please contact us with your situation.',
    primaryAction: {
      text: 'Contact Us',
    },
  },
  'maybe-eligible': {
    icon: <CheckCircle2 className="h-12 w-12 text-yellow-600" />,
    bgColor: 'bg-yellow-100',
    title: 'You May Qualify',
    titleColor: 'text-yellow-700',
    description:
      'Based on your answers, you may qualify for a Solo 401k, but there are some factors that need further consideration. Reach out and our team will get in touch.',
    primaryAction: {
      text: 'Contact Us',
    },
  },
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const { toast } = useToast();

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
        <Button onClick={onReset} variant="outline" type="button" className="border-2">
          <RefreshCw className="mr-2 h-4 w-4" />
          Start Over
        </Button>
        <Button 
          className="bg-survival-600 hover:bg-survival-700"
          type="button"
          onClick={() => {
            openVCitaPopup();
            toast({
              title: "Contact Form Opened",
              description: "Please complete the vCita form to submit your information.",
              duration: 3000,
            });
          }}
        >
          {config.primaryAction.text}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="pt-4">
        <span className="text-xs text-gray-500">
          Secure lead capture powered by vCita.
        </span>
      </div>
    </div>
  );
};

export default ResultDisplay;


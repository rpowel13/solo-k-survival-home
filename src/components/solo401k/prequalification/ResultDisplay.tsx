
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { Result } from './types';
import { useToast } from '@/hooks/use-toast';

interface ResultDisplayProps {
  result: Result;
  onReset: () => void;
}

const resultConfigs = {
  eligible: {
    icon: <CheckCircle2 className="h-12 w-12 text-green-600" />,
    bgColor: 'bg-green-100',
    title: 'You Appear to Qualify!',
    titleColor: 'text-green-700',
    description:
      'Based on your answers, you meet the basic requirements for a Solo 401k. Submit your details below and our team will be in touch for a quick consultation.',
  },
  'not-eligible': {
    icon: <XCircle className="h-12 w-12 text-red-600" />,
    bgColor: 'bg-red-100',
    title: 'You May Not Qualify',
    titleColor: 'text-red-700',
    description:
      'Based on your answers, you may not meet the basic requirements for a Solo 401k. You may still contact us to discuss your situation using the form below.',
  },
  'maybe-eligible': {
    icon: <CheckCircle2 className="h-12 w-12 text-yellow-600" />,
    bgColor: 'bg-yellow-100',
    title: 'You May Qualify',
    titleColor: 'text-yellow-700',
    description:
      "Based on your answers, you may qualify for a Solo 401k, but some factors need further consideration. Send us your details below and we'll reach out!",
  },
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const { toast } = useToast();

  if (!result || !resultConfigs[result]) return null;

  const config = resultConfigs[result];

  return (
    <div id="prequalification-result" className="scroll-mt-[120px]">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className={`rounded-full ${config.bgColor} p-3 inline-block`}>
            {config.icon}
          </div>
        </div>
        <h3 className={`text-xl font-bold ${config.titleColor}`}>{config.title}</h3>
        <p className="max-w-md mx-auto">{config.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button onClick={onReset} variant="outline" type="button" className="border-2">
            <RefreshCw className="mr-2 h-4 w-4" />
            Start Over
          </Button>
        </div>
        {/* Visually center and push the contact form lower on the screen */}
        <div className="flex justify-center w-full mt-24 sm:mt-32 lg:mt-40">
          {/* On lg screens16rem (mt-64) is about 256px ~ header height, so starts below it */}
          <div className="w-full max-w-[400px] bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <iframe
              src="https://www.vcita.com/widgets/contact_form/izk040b42jnjcf3c?frontage_iframe=true"
              width="100%"
              height="600"
              scrolling="no"
              frameBorder="0"
              style={{ border: 'none', minHeight: 600, borderRadius: 8, background: "white" }}
              title="Contact Form for Survival 401k, LLC"
            >
              <p>Please contact me via my contact form at vcita:</p>
              <a href="https://www.vcita.com/v/izk040b42jnjcf3c/contact?frontage_iframe=true&amp;invite=vr_cf_pb-izk040b42jnjcf3c">
                Contact Form for Survival 401k, LLC
              </a>
            </iframe>
            <div className="mt-2 text-xs text-gray-500 text-center">
              Secure lead capture powered by vCita.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;


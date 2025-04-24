
import React from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentTabsProps {
  applicationData: {
    name: string;
    email: string;
    id?: string;
    llcName?: string;
    state?: string;
  };
  paymentLink: string;
  handlePayment: () => void;
}

const PaymentTabs: React.FC<PaymentTabsProps> = ({ applicationData, paymentLink, handlePayment }) => {
  return (
    <div className="text-center py-2">
      <p className="mb-4">Pay securely with your credit or debit card through our payment processor.</p>
      <Button 
        onClick={handlePayment} 
        className="w-full bg-survival-600 hover:bg-survival-700 gap-2"
        asChild
      >
        <a 
          href={paymentLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center"
        >
          <CreditCard className="h-5 w-5" />
          Pay with Card
        </a>
      </Button>
    </div>
  );
};

export default PaymentTabs;

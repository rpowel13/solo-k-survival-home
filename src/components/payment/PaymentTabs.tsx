
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookMarked, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BankAccountForm from './BankAccountForm';

interface PaymentTabsProps {
  applicationData: {
    name: string;
    email: string;
    id?: string;
  };
  paymentLink: string;
  handlePayment: () => void;
}

const PaymentTabs: React.FC<PaymentTabsProps> = ({ applicationData, paymentLink, handlePayment }) => {
  return (
    <Tabs defaultValue="bank" className="w-full px-6 pb-6">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="bank" className="flex items-center gap-2">
          <BookMarked className="h-4 w-4" />
          Bank Account
        </TabsTrigger>
        <TabsTrigger value="card" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Credit Card
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="bank">
        <BankAccountForm applicationData={applicationData} />
      </TabsContent>
      
      <TabsContent value="card">
        <div className="text-center py-2">
          <p className="mb-4">Pay securely with your credit or debit card through our payment processor.</p>
          <Button 
            onClick={handlePayment} 
            className="w-full bg-survival-600 hover:bg-survival-700 gap-2"
          >
            <CreditCard className="h-5 w-5" />
            Proceed to Card Payment
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PaymentTabs;

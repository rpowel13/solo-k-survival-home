
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { handleLLCSubmission } from '@/services/zapier/handlers/llcHandler';
import { BankPayment } from '@/types/formTypes';

interface BankAccountFormProps {
  applicationData: {
    name: string;
    email: string;
    id?: string;
    llcName?: string;
    state?: string;
  };
}

const BankAccountForm: React.FC<BankAccountFormProps> = ({ applicationData }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [accountName, setAccountName] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('checking');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate the form
      if (!accountName || !routingNumber || !accountNumber) {
        throw new Error('Please fill in all bank account fields');
      }
      
      // Validate routing number format (9 digits)
      if (!/^\d{9}$/.test(routingNumber)) {
        throw new Error('Routing number must be 9 digits');
      }

      console.log(`[${new Date().toISOString()}] Processing bank payment for LLC formation`, {
        name: applicationData.name,
        email: applicationData.email,
        llcName: applicationData.llcName || 'Not specified',
        state: applicationData.state || 'Not specified'
      });
      
      // Create bank payment data
      const bankPayment: BankPayment = {
        accountName,
        accountType,
        routingNumber,
        accountNumber
      };
      
      // Send data to Zapier with bank payment information
      console.log(`[${new Date().toISOString()}] Sending LLC formation data with bank payment to Zapier`);
      
      // Retrieve the stored LLC application data for sending to Zapier
      const storedData = sessionStorage.getItem('llc_application');
      if (storedData) {
        const applicationFormData = JSON.parse(storedData);
        
        // Send to Zapier with bank payment info
        const zapierResult = await handleLLCSubmission({
          ...applicationFormData,
          bankPayment,
          formType: 'LLC_Formation'
        });
        
        if (!zapierResult.success) {
          console.error(`[${new Date().toISOString()}] Failed to send LLC data to Zapier:`, zapierResult.message);
        } else {
          console.log(`[${new Date().toISOString()}] Successfully sent LLC data to Zapier with bank payment info`);
        }
      }
      
      // Store the payment information in Supabase
      const { error } = await supabase
        .from('bank_payments')
        .insert([{
          application_id: applicationData?.id,
          customer_name: applicationData?.name,
          customer_email: applicationData?.email,
          account_name: accountName,
          routing_number: routingNumber,
          account_number: accountNumber,
          account_type: accountType,
          amount: 795, // Updated LLC formation price
          status: 'pending'
        }]);
        
      if (error) {
        console.error(`[${new Date().toISOString()}] Failed to submit payment information:`, error);
        throw new Error(`Failed to submit payment information: ${error.message}`);
      }
      
      console.log(`[${new Date().toISOString()}] Bank payment information successfully saved`);
      
      // Send email notification to admins
      try {
        const emailData = {
          to: ["info@survival401k.com"],
          subject: "New ACH Payment for LLC Formation",
          body: `
            <h2>New LLC Formation ACH Payment Submission</h2>
            <p><strong>Name:</strong> ${applicationData?.name}</p>
            <p><strong>Email:</strong> ${applicationData?.email}</p>
            ${applicationData.llcName ? `<p><strong>LLC Name:</strong> ${applicationData.llcName}</p>` : ''}
            ${applicationData.state ? `<p><strong>State:</strong> ${applicationData.state}</p>` : ''}
            <p><strong>Account Name:</strong> ${accountName}</p>
            <p><strong>Account Type:</strong> ${accountType}</p>
            <p><strong>Amount:</strong> $795.00</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          `
        };
        
        await supabase.functions.invoke('send-email-notification', {
          body: emailData
        });
        
        console.log(`[${new Date().toISOString()}] Payment notification email sent`);
      } catch (emailError) {
        console.error(`[${new Date().toISOString()}] Email notification error (non-critical):`, emailError);
        // Not throwing error here as payment was already saved
      }
      
      // Show success message
      toast({
        title: "Payment Information Submitted",
        description: "We've received your payment details and will process it shortly. You'll receive a confirmation email once processed.",
        duration: 5000,
      });
      
      // Redirect to a thank you page or home page
      setTimeout(() => {
        navigate('/');
      }, 3000);
      
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Payment submission error:`, error);
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "There was a problem submitting your payment information.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="accountName">Account Holder Name</Label>
          <Input 
            id="accountName" 
            value={accountName} 
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="routingNumber">Routing Number</Label>
          <Input 
            id="routingNumber" 
            value={routingNumber} 
            onChange={(e) => setRoutingNumber(e.target.value)}
            placeholder="9 digits"
            maxLength={9}
            pattern="[0-9]{9}"
            required
          />
          <p className="text-xs text-gray-500">9-digit number usually found at the bottom left of your check</p>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input 
            id="accountNumber" 
            value={accountNumber} 
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Your account number"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label>Account Type</Label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="checking"
                name="accountType"
                value="checking"
                checked={accountType === 'checking'}
                onChange={() => setAccountType('checking')}
                className="mr-2"
              />
              <Label htmlFor="checking" className="cursor-pointer">Checking</Label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="savings"
                name="accountType"
                value="savings"
                checked={accountType === 'savings'}
                onChange={() => setAccountType('savings')}
                className="mr-2"
              />
              <Label htmlFor="savings" className="cursor-pointer">Savings</Label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full bg-survival-600 hover:bg-survival-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Submit Bank Payment'}
        </Button>
        <p className="text-center text-xs text-gray-500 mt-2">
          Your bank account information is secure and will only be used for this transaction.
        </p>
      </div>
    </form>
  );
};

export default BankAccountForm;

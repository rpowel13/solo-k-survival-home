
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, CreditCard, DollarSign, ShieldCheck, Bank } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Solo401kPayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applicationData, setApplicationData] = useState<{
    name: string;
    email: string;
    applicationDate: string;
    id?: string;
  } | null>(null);
  
  // Bank account form state
  const [accountName, setAccountName] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('checking');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // VCita payment link
  const paymentLink = "https://live.vcita.com/site/izk040b42jnjcf3c/make-payment?title=Solo%20401k%20Application&amount=1240&v_currency=USD";

  useEffect(() => {
    // Retrieve application data from sessionStorage
    const storedData = sessionStorage.getItem('solo401k_application');
    if (storedData) {
      setApplicationData(JSON.parse(storedData));
    } else {
      // Redirect back to application if no data is found
      navigate('/apply/solo-401k');
    }
  }, [navigate]);

  const handlePayment = () => {
    // Open the VCita payment link in a new tab
    window.open(paymentLink, '_blank');
  };

  const handleBankAccountSubmit = async (e: React.FormEvent) => {
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
          amount: 1240,
          status: 'pending',
          created_at: new Date().toISOString()
        }]);
        
      if (error) {
        throw new Error(`Failed to submit payment information: ${error.message}`);
      }
      
      // Send email notification to admins
      const emailData = {
        to: ["ross.powell@survival401k.com", "jill.powell@survival401k.com"],
        subject: "New ACH Payment for Solo 401k",
        body: `
          <h2>New ACH Payment Submission</h2>
          <p><strong>Name:</strong> ${applicationData?.name}</p>
          <p><strong>Email:</strong> ${applicationData?.email}</p>
          <p><strong>Account Name:</strong> ${accountName}</p>
          <p><strong>Account Type:</strong> ${accountType}</p>
          <p><strong>Amount:</strong> $1,240.00</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        `
      };
      
      await supabase.functions.invoke('send-email-notification', {
        body: emailData
      });
      
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
      console.error("Payment submission error:", error);
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "There was a problem submitting your payment information.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!applicationData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
          <p className="text-lg">Loading payment information...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Complete Your Solo 401k Setup</h1>
            <p className="text-lg text-gray-600">Your application has been submitted successfully. Please complete your payment to begin the setup process.</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-start">
            <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-green-800">Application Received</h3>
              <p className="text-green-700">
                Thank you for your application, {applicationData.name}. We've sent a confirmation to {applicationData.email}.
              </p>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-finance-600" />
                Payment Details
              </CardTitle>
              <CardDescription>Review your Solo 401k package details below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-medium">Solo 401k Setup Package</h3>
                  <p className="text-sm text-gray-500">Complete documentation and filing service</p>
                </div>
                <span className="font-bold text-xl">$1,240.00</span>
              </div>
              
              <div className="pt-2">
                <h4 className="font-medium mb-2">Package Includes:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Complete Solo 401k plan documentation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>IRS compliance verification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>EIN application assistance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ongoing support and consultation</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-gray-600 mr-2" />
                  <span className="text-sm text-gray-600">Secure payment processing</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl">Total: $1,240.00</div>
                  <div className="text-sm text-gray-500">One-time payment</div>
                </div>
              </div>
            </CardContent>
            
            <Tabs defaultValue="bank" className="w-full px-6 pb-6">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="bank" className="flex items-center gap-2">
                  <Bank className="h-4 w-4" />
                  Bank Account
                </TabsTrigger>
                <TabsTrigger value="card" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Credit Card
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="bank">
                <form onSubmit={handleBankAccountSubmit} className="space-y-4">
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
          </Card>

          <div className="text-center text-sm text-gray-500">
            <p>Application submitted on {formatDate(applicationData.applicationDate)}</p>
            <p className="mt-1">
              If you have any questions, please contact us at <a href="mailto:support@survival401k.com" className="text-survival-600 hover:underline">support@survival401k.com</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Solo401kPayment;

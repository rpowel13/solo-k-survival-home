
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, BadgePercent } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PaymentTabs from '@/components/payment/PaymentTabs';
import PaymentDetailsCard from '@/components/payment/PaymentDetailsCard';
import ApplicationStatus from '@/components/payment/ApplicationStatus';

const LLCPayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [discountCode, setDiscountCode] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(795);
  const [applicationData, setApplicationData] = useState<{
    name: string;
    email: string;
    applicationDate: string;
    id?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
    };
    llcName?: string;
    state?: string;
  } | null>(null);
  
  // Base vCita payment link for LLC creation
  const basePaymentLink = "https://live.vcita.com/site/izk040b42jnjcf3c/make-payment?title=LLC%20Creation&amount=795&v_currency=USD";
  
  // Create computed payment link that updates when discount is applied
  const paymentLink = isDiscountApplied 
    ? basePaymentLink.replace(/amount=\d+/, `amount=${paymentAmount}`)
    : basePaymentLink;

  useEffect(() => {
    // Retrieve application data from sessionStorage
    const storedData = sessionStorage.getItem('llc_application');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log("[LLC Payment] Retrieved application data:", parsedData);
        
        // Extract LLC name if available
        const llcName = parsedData.llcName || 
                       (parsedData.address && parsedData.address.llcName) || 
                       'LLC Formation';
                       
        // Extract state if available
        const state = parsedData.state || 
                     (parsedData.address && parsedData.address.state) || 
                     '';
        
        setApplicationData({
          ...parsedData,
          llcName,
          state
        });
      } catch (error) {
        console.error("Error parsing LLC application data:", error);
        toast({
          title: "Error Loading Application",
          description: "There was a problem loading your application data. Please try again.",
          variant: "destructive"
        });
      }
    } else {
      // Redirect back to application if no data is found
      navigate('/apply/llc');
    }
  }, [navigate, toast]);

  const handleDiscountCode = () => {
    if (discountCode.trim() === '1stDC' && !isDiscountApplied) {
      const discountedAmount = Math.floor(paymentAmount * 0.9);
      setPaymentAmount(discountedAmount);
      setIsDiscountApplied(true);
      toast({
        title: "Discount Applied!",
        description: "10% discount has been applied to your payment.",
      });
    } else if (discountCode.trim() !== '1stDC') {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid discount code.",
        variant: "destructive",
      });
    }
  };

  const handlePayment = () => {
    // Open the VCita payment link in a new tab
    window.open(paymentLink, '_blank');
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
            <h1 className="text-3xl font-bold mb-2">Complete Your LLC Formation</h1>
            <p className="text-lg text-gray-600">Your application has been submitted successfully. Please complete your payment to begin the LLC formation process.</p>
          </div>

          <ApplicationStatus name={applicationData.name} email={applicationData.email} />

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-finance-600" />
                Payment Details
              </CardTitle>
              <CardDescription>Review your LLC formation package details below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <PaymentDetailsCard />
              
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <div className="mb-4">
                  <h3 className="font-medium text-lg mb-2">Payment Amount</h3>
                  <div className="flex items-center">
                    <span className={`text-2xl font-bold ${isDiscountApplied ? 'line-through text-gray-400' : 'text-survival-700'}`}>${795}</span>
                    {isDiscountApplied && (
                      <span className="text-2xl font-bold text-survival-700 ml-3">${paymentAmount}</span>
                    )}
                  </div>
                  {isDiscountApplied && (
                    <p className="text-sm text-green-600 mt-1">10% discount applied!</p>
                  )}
                </div>
                
                <div className="flex gap-2 mb-2">
                  <Input
                    type="text"
                    placeholder="Enter discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-grow"
                  />
                  <Button 
                    onClick={handleDiscountCode}
                    variant="outline"
                    className="whitespace-nowrap"
                    disabled={isDiscountApplied}
                  >
                    <BadgePercent className="mr-2 h-4 w-4" />
                    Apply Code
                  </Button>
                </div>
              </div>
            </CardContent>
            
            <PaymentTabs 
              applicationData={applicationData} 
              paymentLink={paymentLink} 
              handlePayment={handlePayment} 
            />
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

export default LLCPayment;

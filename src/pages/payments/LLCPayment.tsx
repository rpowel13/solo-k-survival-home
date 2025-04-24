
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PaymentTabs from '@/components/payment/PaymentTabs';
import PaymentDetailsCard from '@/components/payment/PaymentDetailsCard';
import ApplicationStatus from '@/components/payment/ApplicationStatus';

const LLCPayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
  
  // Updated vCita payment link for LLC creation with new price
  const paymentLink = "https://live.vcita.com/site/izk040b42jnjcf3c/make-payment?title=LLC%20Creation&amount=795&v_currency=USD";

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

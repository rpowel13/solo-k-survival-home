
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PaymentTabs from '@/components/payment/PaymentTabs';
import PaymentDetailsCard from '@/components/payment/PaymentDetailsCard';
import ApplicationStatus from '@/components/payment/ApplicationStatus';

const Solo401kPayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applicationData, setApplicationData] = useState<{
    name: string;
    email: string;
    applicationDate: string;
    id?: string;
  } | null>(null);
  
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

          <ApplicationStatus name={applicationData.name} email={applicationData.email} />

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-finance-600" />
                Payment Details
              </CardTitle>
              <CardDescription>Review your Solo 401k package details below</CardDescription>
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

export default Solo401kPayment;

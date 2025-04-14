
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, CreditCard, DollarSign, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Solo401kPayment = () => {
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState<{
    name: string;
    email: string;
    applicationDate: string;
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
                  <span className="text-sm text-gray-600">Secure payment processing via VCita</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl">Total: $1,240.00</div>
                  <div className="text-sm text-gray-500">One-time payment</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handlePayment} 
                className="w-full bg-survival-600 hover:bg-survival-700 gap-2"
              >
                <CreditCard className="h-5 w-5" />
                Proceed to Payment
              </Button>
            </CardFooter>
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

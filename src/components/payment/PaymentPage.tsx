
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, DollarSign, ShieldCheck, Info, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface PaymentPageProps {
  title: string;
  description: string;
  amount: number;
  paymentType: string;
  features?: string[];
  paymentLink: string;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  title,
  description,
  amount,
  paymentType,
  features = [],
  paymentLink,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePayment = () => {
    // In a real implementation, you would redirect to the payment gateway
    window.open(paymentLink, '_blank');
    
    toast({
      title: "Payment Initiated",
      description: `You're being redirected to our secure payment portal for the ${paymentType}.`,
    });
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page in history
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={handleGoBack}
              className="text-gray-600 hover:text-survival-700"
              size="sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-8 text-survival-800">{title}</h1>
          
          <Card className="shadow-md mb-8">
            <CardHeader className="bg-gradient-to-r from-survival-600 to-survival-700 text-white">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-6 w-6" />
                {paymentType}
              </CardTitle>
              <CardDescription className="text-white/80">
                {description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6 pb-4">
              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-survival-800">${amount}</p>
                {paymentType.includes('Annual') && (
                  <p className="text-sm text-gray-500">per year</p>
                )}
              </div>
              
              {features.length > 0 && (
                <div className="space-y-3 mt-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <ShieldCheck className="h-5 w-5 text-survival-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-8 p-4 bg-blue-50 rounded-md text-sm text-blue-800 flex items-start gap-2">
                <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p>All payments are processed through our secure payment gateway.</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              <Button 
                onClick={handlePayment}
                className="w-full bg-survival-600 hover:bg-survival-700 text-white"
                size="lg"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Pay Now
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleGoBack}
                className="w-full text-gray-600"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

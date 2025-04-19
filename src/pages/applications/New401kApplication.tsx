
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, SoloFormValues } from '@/components/solo401k/FormSchema';
import { Form } from "@/components/ui/form";
import PersonalInfoFields from '@/components/solo401k/PersonalInfoFields';
import BusinessInfoFields from '@/components/solo401k/BusinessInfoFields';
import PlanInfoFields from '@/components/solo401k/PlanInfoFields';
import AddressFields from '@/components/solo401k/AddressFields';
import AgreementSection from '@/components/solo401k/AgreementSection';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const New401kApplication = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<SoloFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      ssn: "",
      dateOfBirth: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      businessName: "",
      sponsorEin: "",
      businessType: "sole_proprietorship",
      annualIncome: "under_50k",
      trustee1Name: "",
      trustee2Name: "",
      participant1Name: "",
      participant2Name: "",
      agreeToTerms: false
    }
  });

  const onSubmit = async (data: SoloFormValues) => {
    setIsSubmitting(true);
    try {
      // Store application data for payment process
      sessionStorage.setItem('solo401k_application', JSON.stringify({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        applicationDate: new Date().toISOString()
      }));
      
      toast({
        title: "Application Submitted",
        description: "Your Solo 401k application has been submitted successfully. Redirecting to payment...",
      });
      
      // Redirect to payment page after a short delay
      setTimeout(() => {
        navigate('/payment/solo-401k');
      }, 1500);
      
    } catch (error) {
      console.error("Application submission error:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem processing your application. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-survival-800">Personal Information</h2>
                  <PersonalInfoFields form={form} />
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-survival-800">Address Information</h2>
                  <AddressFields form={form} />
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-survival-800">Business Information</h2>
                  <BusinessInfoFields form={form} />
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-survival-800">Plan Details</h2>
                  <PlanInfoFields form={form} />
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-survival-800">Agreement</h2>
                  <AgreementSection form={form} />
                </div>
                
                <div className="pt-4 text-center">
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">
                    By submitting this form, you'll be redirected to our payment page to complete your application.
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New401kApplication;


import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

// Import our refactored components
import { formSchema, type SoloFormValues } from '@/components/solo401k/FormSchema';
import PersonalInfoFields from '@/components/solo401k/PersonalInfoFields';
import BusinessInfoFields from '@/components/solo401k/BusinessInfoFields';
import PlanInfoFields from '@/components/solo401k/PlanInfoFields';
import FormHeader from '@/components/solo401k/FormHeader';
import AgreementSection from '@/components/solo401k/AgreementSection';
import AdditionalInfoFields from '@/components/solo401k/AdditionalInfoFields';

const Solo401kApplication = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<SoloFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      ssn: '',
      businessName: '',
      businessType: '',
      annualIncome: '',
      trustee1Name: '',
      trustee2Name: '',
      participant1Name: '',
      participant2Name: '',
      existingRetirement: false,
      additionalInfo: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (values: SoloFormValues) => {
    try {
      // Create email data for notification
      const emailData = {
        to: ["ross.powell@survival401k.com", "jill.powell@survival401k.com"],
        subject: "New Solo 401k Application",
        body: `
          <h2>New Solo 401k Application Submission</h2>
          <p><strong>Name:</strong> ${values.firstName} ${values.lastName}</p>
          <p><strong>Email:</strong> ${values.email}</p>
          <p><strong>Phone:</strong> ${values.phone}</p>
          <p><strong>SSN:</strong> ${values.ssn}</p>
          <p><strong>Business Name:</strong> ${values.businessName}</p>
          <p><strong>Business Type:</strong> ${values.businessType}</p>
          <p><strong>Annual Income:</strong> ${values.annualIncome}</p>
          <p><strong>Trustee 1:</strong> ${values.trustee1Name}</p>
          <p><strong>Trustee 2:</strong> ${values.trustee2Name || 'N/A'}</p>
          <p><strong>Participant 1:</strong> ${values.participant1Name}</p>
          <p><strong>Participant 2:</strong> ${values.participant2Name || 'N/A'}</p>
          <p><strong>Has Existing Retirement:</strong> ${values.existingRetirement ? 'Yes' : 'No'}</p>
          <p><strong>Additional Information:</strong> ${values.additionalInfo || 'None provided'}</p>
        `
      };
      
      console.log("Form submission data:", values);
      console.log("Email notification:", emailData);
      
      // Insert application data into Supabase
      const { data, error } = await supabase
        .from('solo401k_applications')
        .insert([{
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          phone: values.phone,
          ssn: values.ssn,
          business_name: values.businessName,
          business_type: values.businessType,
          annual_income: values.annualIncome,
          trustee1_name: values.trustee1Name,
          trustee2_name: values.trustee2Name,
          participant1_name: values.participant1Name,
          participant2_name: values.participant2Name,
          existing_retirement: values.existingRetirement,
          additional_info: values.additionalInfo,
          status: 'submitted',
          application_date: new Date().toISOString()
        }])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw new Error(`Failed to submit application: ${error.message}`);
      }
      
      // Send email notification via Supabase function
      const { error: emailError } = await supabase.functions.invoke('send-email-notification', {
        body: emailData
      });
      
      if (emailError) {
        console.error("Email notification error:", emailError);
        // Continue with the flow even if email fails
      } else {
        console.log("Email notification sent successfully");
      }
      
      toast({
        title: "Application Submitted",
        description: "We've received your Solo 401k application. Redirecting to payment...",
      });
      
      // Store application data in sessionStorage for the payment page
      sessionStorage.setItem('solo401k_application', JSON.stringify({
        id: data?.[0]?.id,
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        applicationDate: new Date().toISOString()
      }));
      
      // Reset form and redirect to payment page
      form.reset();
      
      // Redirect to payment page after a short delay
      setTimeout(() => {
        navigate('/payment/solo-401k');
      }, 1500);
      
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your application. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <FormHeader />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8">
                <PersonalInfoFields form={form} />
                <BusinessInfoFields form={form} />
                <PlanInfoFields form={form} />
                <AdditionalInfoFields form={form} />
                <AgreementSection form={form} />
              </div>

              <Button type="submit" className="w-full bg-survival-600 hover:bg-survival-700">
                Submit Application
              </Button>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Solo401kApplication;

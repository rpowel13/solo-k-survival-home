
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  ssn: z.string().min(9, { message: 'Please enter a valid Social Security Number' }),
  businessName: z.string().min(2, { message: 'Business name is required' }),
  businessType: z.string().min(1, { message: 'Please select a business type' }),
  annualIncome: z.string().min(1, { message: 'Annual income information is required' }),
  trustee1Name: z.string().min(2, { message: 'Trustee name is required' }),
  trustee2Name: z.string().optional(),
  participant1Name: z.string().min(2, { message: 'Participant name is required' }),
  participant2Name: z.string().optional(),
  existingRetirement: z.boolean().optional(),
  additionalInfo: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

const Solo401kApplication = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Email submission logic
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
      
      // In a real app, you would send this data to your backend API
      // For demonstration, we'll just log it and show success
      console.log("Form submission data:", emailData);
      
      toast({
        title: "Application Submitted",
        description: "We've received your Solo 401k application. Our team will contact you shortly.",
      });
      form.reset();
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
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-survival-800">Solo 401k Application</h1>
            <p className="mt-4 text-gray-600">
              Complete the form below to apply for your personalized Solo 401k plan. Our team will review your information and contact you to discuss the next steps.
            </p>
          </div>

          <Alert className="mb-8 bg-amber-50 border-amber-200">
            <InfoIcon className="h-5 w-5 text-amber-500" />
            <AlertDescription className="text-amber-800">
              <strong>Disclaimer:</strong> Survival 401k is not a law firm, accounting firm, or financial advisory firm, and cannot act as your fiduciary. We provide 
              plan documentation services and general information about retirement plans. Please consult with your attorney, accountant, or financial advisor regarding your specific situation.
            </AlertDescription>
          </Alert>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="ssn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Security Number</FormLabel>
                    <FormControl>
                      <Input placeholder="xxx-xx-xxxx" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your SSN is required for plan documentation. This information is kept secure.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Business LLC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Type</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      >
                        <option value="">Select business type</option>
                        <option value="sole_proprietorship">Sole Proprietorship</option>
                        <option value="llc">LLC</option>
                        <option value="partnership">Partnership</option>
                        <option value="s_corporation">S Corporation</option>
                        <option value="c_corporation">C Corporation</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="annualIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Annual Business Income</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      >
                        <option value="">Select income range</option>
                        <option value="under_50k">Under $50,000</option>
                        <option value="50k_100k">$50,000 - $100,000</option>
                        <option value="100k_250k">$100,000 - $250,000</option>
                        <option value="250k_500k">$250,000 - $500,000</option>
                        <option value="over_500k">Over $500,000</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="trustee1Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trustee 1 Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Primary Trustee Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="trustee2Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trustee 2 Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Secondary Trustee Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="participant1Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Participant 1 Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Primary Participant Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="participant2Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Participant 2 Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Secondary Participant Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="existingRetirement"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I currently have other retirement accounts (IRA, 401k, etc.)
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please share any additional information that might be relevant to your application"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the terms and conditions and privacy policy
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

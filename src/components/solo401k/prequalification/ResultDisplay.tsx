
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { Result } from './types';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { triggerZapierWebhook } from '@/services/zapierService';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
});

interface ResultDisplayProps {
  result: Result;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  });

  const resultConfigs = {
    eligible: {
      icon: <CheckCircle2 className="h-12 w-12 text-green-600" />,
      bgColor: 'bg-green-100',
      title: 'You Appear to Qualify!',
      titleColor: 'text-green-700',
      description: 'Based on your answers, you meet the basic requirements for a Solo 401k. Fill out the form below to get started.',
      primaryAction: {
        text: 'Submit Contact Info',
        href: '/apply/solo-401k',
      },
    },
    'not-eligible': {
      icon: <XCircle className="h-12 w-12 text-red-600" />,
      bgColor: 'bg-red-100',
      title: 'You May Not Qualify',
      titleColor: 'text-red-700',
      description: 'Based on your answers, you may not meet the basic requirements for a Solo 401k. Please contact us for a consultation to explore your options.',
      primaryAction: {
        text: 'Contact Us',
        href: '/contact',
      },
    },
    'maybe-eligible': {
      icon: <CheckCircle2 className="h-12 w-12 text-yellow-600" />,
      bgColor: 'bg-yellow-100',
      title: 'You May Qualify',
      titleColor: 'text-yellow-700',
      description: 'Based on your answers, you may qualify for a Solo 401k, but there are some factors that need further consideration. We recommend contacting us for a consultation.',
      primaryAction: {
        text: 'Contact Us',
        href: '/contact',
      },
    },
  };

  const onSubmit = async (data: z.infer<typeof contactFormSchema>) => {
    setIsSubmitting(true);
    try {
      await triggerZapierWebhook({
        formType: 'Solo401k_Prequalification',
        qualification_result: result,
        ...data
      });
      
      toast({
        title: "Contact information submitted",
        description: "Thank you! We'll be in touch shortly to discuss your Solo 401k options.",
      });
      
      onReset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit contact information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!result || !resultConfigs[result]) return null;

  const config = resultConfigs[result];

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className={`rounded-full ${config.bgColor} p-3 inline-block`}>
          {config.icon}
        </div>
      </div>
      <h3 className={`text-xl font-bold ${config.titleColor}`}>{config.title}</h3>
      <p className="max-w-md mx-auto">
        {config.description}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="(123) 456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button onClick={onReset} variant="outline" type="button" className="border-2">
              <RefreshCw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
            <Button 
              className="bg-survival-600 hover:bg-survival-700"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Contact Info"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResultDisplay;

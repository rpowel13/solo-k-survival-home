import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema, ContactFormValues } from '@/components/contact/ContactFormSchema';
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from '@/services/supabaseFormService';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(data);
      if (result.success) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
        form.reset();
      } else {
        toast({
          title: "Something went wrong.",
          description: "There was an error sending your message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Contact Us</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </Label>
                  <Form.Item>
                    <Form.Control>
                      <Input
                        id="name"
                        placeholder="Your Name"
                        type="text"
                        {...form.register("name")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Form.Item>
                    <Form.Control>
                      <Input
                        id="email"
                        placeholder="you@example.com"
                        type="email"
                        {...form.register("email")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                </div>
                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number (Optional)
                  </Label>
                  <Form.Item>
                    <Form.Control>
                      <Input
                        id="phone"
                        placeholder="123-456-7890"
                        type="tel"
                        {...form.register("phone")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                </div>
                <div>
                  <Label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject (Optional)
                  </Label>
                  <Form.Item>
                    <Form.Control>
                      <Input
                        id="subject"
                        placeholder="Subject of your message"
                        type="text"
                        {...form.register("subject")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                </div>
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </Label>
                  <Form.Item>
                    <Form.Control>
                      <Textarea
                        id="message"
                        placeholder="Your message here..."
                        rows={4}
                        {...form.register("message")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Form.Item>
                      <Form.Control>
                        <Checkbox
                          id="consent"
                          {...form.register("consent")}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  </div>
                  <div className="ml-3 text-sm">
                    <Label htmlFor="consent" className="font-medium text-gray-700">
                      I consent to receive marketing communications from Survival Business.
                    </Label>
                    <p className="text-gray-500">
                      You can unsubscribe at any time.
                    </p>
                  </div>
                </div>
                <div>
                  {/* Fix: replace 'Boolean()' call to use lowercase 'Boolean' function correctly or logic fix. */}
                  {/* const checked = Boolean(value); // use Boolean as a function, ensure value is properly used here. */}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

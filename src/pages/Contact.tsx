import React, { useState } from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";

const Contact = () => {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto section-padding">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 text-center mb-12">
              Have questions about Solo 401(k) plans? Our retirement specialists are here to help.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Reach Out to Us</CardTitle>
                  <CardDescription>We're available to assist you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-3 text-survival-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-gray-600">(833) 224-5517</p>
                        <p className="text-sm text-gray-500 mt-1">Monday-Friday, 9am-5pm ET</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-3 text-survival-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-gray-600">info@survival401k.com</p>
                        <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Send a Message</CardTitle>
                  <CardDescription>Get in touch with our team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Fill out our contact form and one of our retirement specialists will get back to you promptly.
                  </p>
                  
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full flex items-center gap-2" size="lg">
                        <MessageSquare className="h-5 w-5" />
                        Contact Us Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent 
                      className="sm:max-w-[600px] p-0 overflow-hidden"
                      style={{ height: '600px' }}
                    >
                      <DialogHeader>
                        <DialogTitle className="sr-only">Contact Form</DialogTitle>
                        <DialogDescription className="sr-only">Fill out the contact form</DialogDescription>
                      </DialogHeader>
                      <iframe 
                        src="https://www.vcita.com/widgets/contact_form/izk040b42jnjcf3c?frontage_iframe=true" 
                        width="100%" 
                        height="100%" 
                        frameBorder="0"
                        title="Contact Form for Survival 401k"
                        className="border-0"
                        style={{ pointerEvents: 'auto', overflow: 'hidden' }}
                      />
                    </DialogContent>
                  </Dialog>
                  
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Your information is secure and will never be shared with third parties.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-8">
              <h2 className="text-2xl font-semibold mb-4">Schedule a Consultation</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                Want to discuss your retirement planning options in detail? Schedule a free 30-minute consultation with one of our Solo 401(k) specialists.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white"
                onClick={() => setIsSchedulerOpen(true)}
              >
                Book a Free Consultation
              </Button>
              
              <Dialog open={isSchedulerOpen} onOpenChange={setIsSchedulerOpen}>
                <DialogContent 
                  className="sm:max-w-[600px] p-0 overflow-hidden" 
                  style={{ height: '600px' }}
                >
                  <DialogHeader>
                    <DialogTitle className="sr-only">Schedule a Consultation</DialogTitle>
                    <DialogDescription className="sr-only">Schedule a free consultation with our specialists</DialogDescription>
                  </DialogHeader>
                  <iframe 
                    src="https://www.vcita.com/widgets/scheduler/izk040b42jnjcf3c?frontage_iframe=true" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0"
                    title="Schedule a Consultation with Survival 401k"
                    className="border-0"
                    style={{ pointerEvents: 'auto', overflow: 'hidden' }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

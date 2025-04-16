
import React, { useState, useEffect } from "react";
import { Mail, Phone, MessageSquare, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import ContactForm from "@/components/ContactForm";
import ScheduleConsultationForm from "@/components/ScheduleConsultationForm";
import { testSupabaseConnection, logSupabaseInfo, insertTestContact } from "@/services/debugService";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Run comprehensive diagnostics on page load
    console.log(`[${new Date().toISOString()}] Contact page mounted, running comprehensive diagnostics`);
    logSupabaseInfo();
    
    // Test Supabase connection on page load
    const runDiagnostics = async () => {
      // Test connection
      const connectionResult = await testSupabaseConnection();
      
      if (!connectionResult.success) {
        console.error(`[${new Date().toISOString()}] Supabase connection test failed on Contact page load:`, connectionResult.error);
        
        // Check for RLS policy issues
        if (connectionResult.error?.message?.includes('new row violates row-level security policy')) {
          toast({
            title: "Database Permission Issue",
            description: "Row Level Security is preventing data insertion. This is a configuration issue that needs to be addressed in Supabase.",
            variant: "destructive",
            duration: 10000
          });
        } else {
          toast({
            title: "Database Connection Issue",
            description: "There may be an issue connecting to our database. Your message will still be received through backup systems.",
            variant: "destructive",
            duration: 5000
          });
        }
      } else {
        console.log(`[${new Date().toISOString()}] Supabase connection test successful on Contact page load`);
      }
      
      // Attempt a direct insert as a final test
      const insertResult = await insertTestContact();
      if (insertResult.success) {
        console.log(`[${new Date().toISOString()}] Direct test insert successful on page load`);
      } else {
        console.error(`[${new Date().toISOString()}] Direct test insert failed on page load:`, insertResult.error);
      }
    };
    
    runDiagnostics();
  }, [toast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
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
                    
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-3 text-survival-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Schedule a Call</h3>
                        <p className="text-gray-600">Book a free consultation</p>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-survival-600 mt-1" 
                          onClick={() => setIsSchedulerOpen(true)}
                        >
                          Choose a time →
                        </Button>
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
                <CardContent>
                  <ContactForm />
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
                  className="sm:max-w-[700px] md:max-w-[800px] p-6 z-50" 
                >
                  <DialogHeader>
                    <DialogTitle>Schedule a Free Consultation</DialogTitle>
                    <DialogDescription>Select a date and time that works for you. Our specialist will call you at the scheduled time.</DialogDescription>
                  </DialogHeader>
                  <ScheduleConsultationForm />
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

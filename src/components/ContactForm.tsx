
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { submitContactForm } from "@/services/vcitaService";
import { contactFormSchema, defaultValues, ContactFormValues } from "./contact/ContactFormSchema";
import NameField from "./contact/NameField";
import EmailField from "./contact/EmailField";
import PhoneField from "./contact/PhoneField";
import SubjectField from "./contact/SubjectField";
import MessageField from "./contact/MessageField";
import ConsentField from "./contact/ConsentField";
import SubmitButton from "./contact/SubmitButton";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    console.log("Form submitted with data:", data);
    
    try {
      const result = await submitContactForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        consent: data.consent
      });
      
      if (result.success) {
        toast({
          title: "Message sent successfully",
          description: result.message || "We'll get back to you as soon as possible.",
        });
        
        form.reset();
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast({
        title: "Error sending message",
        description: error instanceof Error 
          ? error.message 
          : "Please try again or contact us directly at (833) 224-5517.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleIframeError = () => {
    console.error("Failed to load vCita iframe");
    setIframeError(true);
  };

  // Function to intercept form submission from the iframe
  const setupIframeInterception = () => {
    try {
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        const iframeWindow = iframe.contentWindow;
        
        // Attempt to add an event listener to the iframe's form
        const originalSubmit = iframeWindow.HTMLFormElement.prototype.submit;
        iframeWindow.HTMLFormElement.prototype.submit = function() {
          // Show consent dialog before submitting
          setShowConsentDialog(true);
          
          // Store the original form reference for later submission
          window.vcitaFormToSubmit = this;
          
          // Prevent default submission
          return false;
        };
        
        console.log("Successfully set up iframe form interception");
      }
    } catch (e) {
      console.error("Failed to intercept iframe form submission:", e);
    }
  };

  // This function will trigger when the iframe loads
  const handleIframeLoad = () => {
    console.log("vCita iframe loaded");
    setupIframeInterception();
    
    // Add a click event listener to the parent document
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      // Check if the clicked element is a submit button within the iframe
      if (target.tagName === 'BUTTON' && target.type === 'submit') {
        // Show consent dialog
        setShowConsentDialog(true);
        e.preventDefault();
      }
    }, true);
  };

  // Function to handle consent acceptance and continue with form submission
  const handleConsentAccept = () => {
    console.log("Consent accepted, proceeding with form submission");
    setConsentAccepted(true);
    setShowConsentDialog(false);
    
    // Now update our record of consent and allow the form to be submitted
    if (window.vcitaFormToSubmit) {
      const originalSubmit = window.vcitaFormToSubmit.submit;
      window.vcitaFormToSubmit.submit();
    } else {
      console.log("Form reference not found, redirecting to vCita directly");
      window.open('https://www.vcita.com/v/izk040b42jnjcf3c/contact?frontage_iframe=true&invite=vr_cf_pb-izk040b42jnjcf3c', '_blank');
    }
  };

  // If we're showing the iframe-based contact form
  if (!iframeError) {
    return (
      <div className="w-full">
        <iframe 
          src="https://www.vcita.com/widgets/contact_form/izk040b42jnjcf3c?frontage_iframe=true&v=3" 
          width="100%" 
          height="700" 
          scrolling="no" 
          frameBorder="0" 
          onError={handleIframeError}
          onLoad={handleIframeLoad}
          title="Contact Form"
          className="w-full min-h-[700px]"
        >
          <p>Please contact me via my contact form at vcita:</p>
          <a href='https://www.vcita.com/v/izk040b42jnjcf3c/contact?frontage_iframe=true&invite=vr_cf_pb-izk040b42jnjcf3c'>
            Contact Form for Survival 401k, LLC
          </a>
        </iframe>
        
        {/* Consent Dialog */}
        <Dialog open={showConsentDialog} onOpenChange={setShowConsentDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Consent Required</DialogTitle>
              <DialogDescription>
                Please review and confirm your consent before submitting the form.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex items-start space-x-3 space-y-0 rounded-md p-4 border mt-4">
              <Checkbox 
                id="consent-checkbox" 
                checked={consentAccepted} 
                onCheckedChange={(checked) => setConsentAccepted(checked as boolean)}
              />
              <div className="space-y-1 leading-none">
                <label htmlFor="consent-checkbox" className="text-sm font-normal cursor-pointer">
                  By clicking "submit", I consent to join the email list and receive SMS from Survival 401k, with access to latest offers and services. Message and data rates may apply. Message frequency varies. More details on this are in our <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> and <Link to="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link>. Text "HELP" for help or contact us at (833) 224-5517. Text "STOP" to cancel.
                </label>
              </div>
            </div>
            
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setShowConsentDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleConsentAccept} 
                disabled={!consentAccepted}
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Fallback to our custom form if iframe fails
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {iframeError && (
          <div className="p-4 mb-4 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-amber-700 text-sm">
              The contact widget could not be loaded. You can still use this form to send us a message.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NameField form={form} />
          <EmailField form={form} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PhoneField form={form} />
          <SubjectField form={form} />
        </div>
        
        <MessageField form={form} />
        <ConsentField form={form} />
        
        <SubmitButton isSubmitting={isSubmitting} />
        
        <p className="text-xs text-gray-500 text-center mt-2">
          Your information is secure and will never be shared with third parties.
        </p>
      </form>
    </Form>
  );
};

export default ContactForm;

// Add a global declaration for the form reference
declare global {
  interface Window {
    vcitaFormToSubmit: any;
  }
}

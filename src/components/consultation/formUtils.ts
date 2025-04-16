
import { ScheduleFormValues } from "./types";
import { useToast } from "@/hooks/use-toast";
import { triggerZapierWebhook } from "@/services/zapierService";
import { submitConsultationForm } from "@/services/supabaseFormService";

// Define a type for the toast function that matches how we need to use it
type ToastFunction = {
  (props: { title: string; description: string; variant?: "default" | "destructive" }): void;
};

export const handleScheduleSubmit = async (
  data: ScheduleFormValues,
  toast: ToastFunction,
  setIsSubmitting: (value: boolean) => void,
  resetForm: () => void
) => {
  setIsSubmitting(true);
  
  try {
    console.log("Schedule form data:", data);
    
    // Format the date for display if it's a Date object
    const formattedDate = data.date instanceof Date 
      ? data.date.toLocaleDateString() 
      : data.date;
    
    // Primary submission via Zapier for WooSender notifications
    const zapierResult = await triggerZapierWebhook(data);
    
    // Secondary submission to Supabase for data storage and email notification
    const supabaseResult = await submitConsultationForm(data);
    
    if (zapierResult.success || supabaseResult.success) {
      toast({
        title: "Consultation Scheduled!",
        description: `Your consultation is scheduled for ${formattedDate} at ${data.time}. We'll call you at the provided number.`,
      });
      
      resetForm();
      
      // Close the dialog after a successful submission
      const closeDialogTimeout = setTimeout(() => {
        const dialogCloseButton = document.querySelector('[data-dialog-close="true"]');
        if (dialogCloseButton instanceof HTMLElement) {
          dialogCloseButton.click();
        }
      }, 3000);
      
      return () => clearTimeout(closeDialogTimeout);
    } else {
      throw new Error(zapierResult.message || "Failed to schedule consultation");
    }
  } catch (error) {
    console.error("Schedule consultation error:", error);
    toast({
      title: "Error scheduling consultation",
      description: error instanceof Error 
        ? error.message 
        : "Please try again or contact us directly at (833) 224-5517.",
      variant: "destructive"
    });
  } finally {
    setIsSubmitting(false);
  }
};

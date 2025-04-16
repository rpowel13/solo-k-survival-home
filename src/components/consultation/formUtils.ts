
import { ScheduleFormValues } from "./types";
import { toast as toastType } from "@/hooks/use-toast";
import { triggerZapierWebhook } from "@/services/zapierService";

// Define a type for the toast function
type ToastType = typeof toastType;

export const handleScheduleSubmit = async (
  data: ScheduleFormValues,
  toast: ToastType,
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
    
    // First try to send via Zapier to WooSender
    const zapierResult = await triggerZapierWebhook(data);
    
    if (zapierResult.success) {
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

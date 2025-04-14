
import { format } from "date-fns";
import { ScheduleFormValues } from "./types";
import { scheduleConsultation } from "@/services/vcitaService";
import { toast } from "@/hooks/use-toast";

export const handleScheduleSubmit = async (
  data: ScheduleFormValues,
  toast: typeof toast,
  setIsSubmitting: (value: boolean) => void,
  resetForm: () => void
) => {
  setIsSubmitting(true);
  
  try {
    // Format the selected date and time for VCita
    const formattedDate = format(data.date, "yyyy-MM-dd");
    
    await scheduleConsultation({
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: formattedDate,
      time: data.time,
      message: data.message
    });
    
    toast({
      title: "Consultation scheduled successfully",
      description: `We'll see you on ${format(data.date, "MMMM d, yyyy")} at ${data.time}.`,
    });
    
    resetForm();
  } catch (error) {
    // Error handling is done in the service
  } finally {
    setIsSubmitting(false);
  }
};


import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { scheduleFormSchema, ScheduleFormValues } from "./consultation/types";
import { scheduleConsultation } from "@/services/vcitaService";
import { format } from "date-fns";
import ContactFields from "./consultation/ContactFields";
import DateSelector from "./consultation/DateSelector";
import TimeSelector from "./consultation/TimeSelector";
import MessageField from "./consultation/MessageField";
import SubmitButton from "./consultation/SubmitButton";

const ScheduleConsultationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ScheduleFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Format the selected date and time for VCita
      const formattedDate = format(data.date, "yyyy-MM-dd");
      
      const result = await scheduleConsultation({
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: formattedDate,
        time: data.time,
        message: data.message
      });
      
      if (result.success) {
        toast({
          title: "Consultation scheduled successfully",
          description: `We'll see you on ${format(data.date, "MMMM d, yyyy")} at ${data.time}.`,
        });
        
        form.reset();
      } else {
        throw new Error(result.message || "Failed to schedule consultation");
      }
    } catch (error) {
      console.error("Consultation scheduling error:", error);
      toast({
        title: "Error scheduling consultation",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ContactFields form={form} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateSelector form={form} />
          <TimeSelector form={form} />
        </div>
        
        <MessageField form={form} />
        
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default ScheduleConsultationForm;

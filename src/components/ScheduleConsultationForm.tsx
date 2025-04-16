
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { scheduleFormSchema, ScheduleFormValues } from "./consultation/types";
import { handleScheduleSubmit } from "./consultation/formUtils";
import ContactFields from "./consultation/ContactFields";
import DateSelector from "./consultation/DateSelector";
import TimeSelector from "./consultation/TimeSelector";
import MessageField from "./consultation/MessageField";
import SubmitButton from "./consultation/SubmitButton";
import ZapierConfig from "./consultation/ZapierConfig";

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
    await handleScheduleSubmit(
      data,
      // Pass the toast function directly
      (props) => toast(props),
      setIsSubmitting,
      () => form.reset()
    );
  };

  return (
    <>
      <ZapierConfig />
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
    </>
  );
};

export default ScheduleConsultationForm;

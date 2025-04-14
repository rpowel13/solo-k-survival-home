
import { z } from "zod";

export const scheduleFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  date: z.date({
    required_error: "Please select a date for your consultation.",
  }),
  time: z.string({
    required_error: "Please select a time for your consultation.",
  }),
  message: z.string().optional(),
});

export type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;

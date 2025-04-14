
import * as z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms to submit the form."
  })
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  consent: false
};


import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ContactFormValues } from "./ContactFormSchema";

interface EmailFieldProps {
  form: UseFormReturn<ContactFormValues>;
}

const EmailField: React.FC<EmailFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="your.email@example.com" type="email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmailField;

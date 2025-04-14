
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ContactFormValues } from "./ContactFormSchema";

interface MessageFieldProps {
  form: UseFormReturn<ContactFormValues>;
}

const MessageField: React.FC<MessageFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Message</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="How can we help you?" 
              className="min-h-[120px]" 
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MessageField;

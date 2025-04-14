
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ScheduleFormValues } from "./types";

interface MessageFieldProps {
  form: UseFormReturn<ScheduleFormValues>;
}

const MessageField: React.FC<MessageFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Additional Information (Optional)</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Let us know if you have any specific questions or topics you'd like to discuss" 
              className="min-h-[100px]" 
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

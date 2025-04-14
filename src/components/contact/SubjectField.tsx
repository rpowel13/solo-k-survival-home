
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ContactFormValues } from "./ContactFormSchema";

interface SubjectFieldProps {
  form: UseFormReturn<ContactFormValues>;
}

const SubjectField: React.FC<SubjectFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="subject"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Subject</FormLabel>
          <FormControl>
            <Input placeholder="What is this regarding?" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SubjectField;

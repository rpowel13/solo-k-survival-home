
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ContactFormValues } from "./ContactFormSchema";

interface PhoneFieldProps {
  form: UseFormReturn<ContactFormValues>;
}

const PhoneField: React.FC<PhoneFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Phone</FormLabel>
          <FormControl>
            <Input placeholder="(123) 456-7890" type="tel" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhoneField;

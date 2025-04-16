
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { ContactFormValues } from "./ContactFormSchema";
import { Link } from "react-router-dom";

interface OptInCheckboxProps {
  form: UseFormReturn<ContactFormValues>;
}

const OptInCheckbox: React.FC<OptInCheckboxProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="consent"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border mt-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="text-sm font-normal">
              I consent to join the email list and receive SMS from Survival 401k, with access to latest offers and services. Message and data rates may apply. Message frequency varies. More details in our <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> and <Link to="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link>.
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default OptInCheckbox;

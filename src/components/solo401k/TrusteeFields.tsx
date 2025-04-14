
import React from 'react';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { SoloFormValues } from './FormSchema';

interface TrusteeFieldsProps {
  form: UseFormReturn<SoloFormValues>;
}

const TrusteeFields = ({ form }: TrusteeFieldsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <FormField
        control={form.control}
        name="trustee1Name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Trustee 1 Name</FormLabel>
            <FormControl>
              <Input placeholder="Primary Trustee Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="trustee2Name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Trustee 2 Name (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Secondary Trustee Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TrusteeFields;

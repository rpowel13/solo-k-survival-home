
import React from 'react';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { SoloFormValues } from './FormSchema';

interface AdditionalInfoFieldsProps {
  form: UseFormReturn<SoloFormValues>;
}

const AdditionalInfoFields = ({ form }: AdditionalInfoFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="existingRetirement"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I currently have other retirement accounts (IRA, 401k, etc.)
              </FormLabel>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additionalInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Information</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Please share any additional information that might be relevant to your application"
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AdditionalInfoFields;

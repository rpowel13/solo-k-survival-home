
import React from 'react';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { SoloFormValues } from './FormSchema';

interface PlanInfoFieldsProps {
  form: UseFormReturn<SoloFormValues>;
}

const PlanInfoFields = ({ form }: PlanInfoFieldsProps) => {
  return (
    <>
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="participant1Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Participant 1 Name</FormLabel>
              <FormControl>
                <Input placeholder="Primary Participant Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="participant2Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Participant 2 Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Secondary Participant Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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

      <FormField
        control={form.control}
        name="agreeToTerms"
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
                I agree to the terms and conditions and privacy policy
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PlanInfoFields;

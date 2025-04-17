
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LLCFormValues } from './FormSchema';

interface BusinessInfoFieldsProps {
  form: UseFormReturn<LLCFormValues>;
}

const BusinessInfoFields = ({ form }: BusinessInfoFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="desiredLLCName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Desired LLC Name (First Choice)</FormLabel>
            <FormControl>
              <Input placeholder="Your Business LLC" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="alternativeName1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alternative LLC Name (Second Choice)</FormLabel>
              <FormControl>
                <Input placeholder="Alternative Business LLC" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alternativeName2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alternative LLC Name (Third Choice)</FormLabel>
              <FormControl>
                <Input placeholder="Second Alternative LLC" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="memberCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of LLC Members</FormLabel>
              <FormControl>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  {...field}
                >
                  <option value="">Select number of members</option>
                  <option value="1">1 (Single Member LLC)</option>
                  <option value="2">2</option>
                  <option value="3-5">3-5</option>
                  <option value="6-10">6-10</option>
                  <option value="11+">11 or more</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessPurpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Purpose</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Briefly describe the primary purpose and activities of your LLC"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default BusinessInfoFields;


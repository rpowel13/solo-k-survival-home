
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LLCFormValues } from './FormSchema';

interface ManagementFieldsProps {
  form: UseFormReturn<LLCFormValues>;
}

const ManagementFields: React.FC<ManagementFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="managementType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>LLC Management Type</FormLabel>
            <FormControl>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...field}
              >
                <option value="">Select management type</option>
                <option value="member">Member Managed</option>
                <option value="manager">Manager Managed</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="member1Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Member/Manager #1 Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="member1Title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Member/Manager #1 Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Managing Member" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="member2Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Member/Manager #2 Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="member2Title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Member/Manager #2 Title (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Member" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default ManagementFields;

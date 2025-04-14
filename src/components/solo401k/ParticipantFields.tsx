
import React from 'react';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { SoloFormValues } from './FormSchema';

interface ParticipantFieldsProps {
  form: UseFormReturn<SoloFormValues>;
}

const ParticipantFields = ({ form }: ParticipantFieldsProps) => {
  return (
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
  );
};

export default ParticipantFields;

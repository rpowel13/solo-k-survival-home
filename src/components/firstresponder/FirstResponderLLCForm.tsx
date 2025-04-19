
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import PersonalInfoFields from '@/components/llc/PersonalInfoFields';
import AddressFields from '@/components/llc/AddressFields';
import BusinessInfoFields from '@/components/llc/BusinessInfoFields';
import AdditionalInfoFields from '@/components/llc/AdditionalInfoFields';
import { LLCFormProps } from './types';

interface Props {
  form: LLCFormProps['form'];
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FirstResponderLLCForm: React.FC<Props> = ({ form, isSubmitting, onSubmit }) => {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-survival-800">Personal Information</h2>
          <PersonalInfoFields form={form} />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-survival-800">Address Information</h2>
          <AddressFields form={form} />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-survival-800">Business Information</h2>
          <BusinessInfoFields form={form} />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-survival-800">Additional Information</h2>
          <AdditionalInfoFields form={form} />
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Continue to Solo 401k Application"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FirstResponderLLCForm;

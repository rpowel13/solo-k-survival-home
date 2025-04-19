
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import Solo401kBusinessInfo from '@/components/solo401k/BusinessInfoFields';
import PlanInfoFields from '@/components/solo401k/PlanInfoFields';
import { Solo401kFormProps } from './types';

interface Props {
  form: Solo401kFormProps['form'];
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

const FirstResponder401kForm: React.FC<Props> = ({ form, isSubmitting, onSubmit, onBack }) => {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-survival-800">Solo 401k Details</h2>
          <Solo401kBusinessInfo form={form} />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-survival-800">Plan Details</h2>
          <PlanInfoFields form={form} />
        </div>

        <div className="flex gap-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={onBack}
            disabled={isSubmitting}
          >
            Back to LLC Application
          </Button>
          
          <Button 
            type="submit"
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit First Responder Package"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FirstResponder401kForm;

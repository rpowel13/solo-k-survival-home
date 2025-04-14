
import React from 'react';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { SoloFormValues } from './FormSchema';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

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

      {/* Combined Disclaimer Alert */}
      <Alert className="mb-8 bg-amber-50 border-amber-200">
        <InfoIcon className="h-5 w-5 text-amber-500" />
        <AlertDescription className="text-amber-800 space-y-4">
          <h3 className="font-bold text-lg">Agreement For Services</h3>
          <p>I, the Plan Administrator, acknowledge by signing this agreement the responsibility associated with establishing and operating a qualified retirement plan.</p>
          
          <p>This Agreement shall not be construed to appoint SURVIVAL 401K, LLC as a Plan Administrator or as a fiduciary of the Plan. This Agreement shall not be construed to delegate to SURVIVAL 401K, LLC any obligation, responsibility or liability of the Plan Administrator or any other fiduciary of the Plan either expressly or under applicable law.</p>
          
          <p>SURVIVAL 401K, LLC shall exercise no discretion regarding management or administration of the Plan, and shall provide only ministerial services as provided under this agreement.</p>
          
          <p>The obligations, responsibilities and liabilities of SURVIVAL 401K, LLC shall be limited to those provided under this Agreement.</p>
          
          <p>In no event shall SURVIVAL 401K, LLC be liable to the Plan Administrator or any other person or entity for payments of any fees, costs or expenses incurred for accounting, legal or other administrative services rendered in connection with the Plan.</p>
          
          <h3 className="font-bold text-lg mt-6">General Provisions</h3>
          
          <p>A. Except as required by law or on account of SURVIVAL 401K's negligence or bad faith, SURVIVAL 401K shall not be responsible for the terms or validity of the Plan or any federal or state tax liability which may be imposed upon the Employer, the Plan Administrator, the Trustees or any participant under or beneficiary of the Plan. The Plan Administrator shall indemnify, protect and hold SURVIVAL 401K harmless of and from any losses, liabilities, claims and demands whatsoever, and expenses in connection therewith, including attorney's fees and court costs, which arise out of SURVIVAL 401K's Services and which are not due to SURVIVAL 401K's own negligence or bad faith.</p>
          
          <p>B. This Agreement is made in, and shall be construed, interpreted and enforced according to the laws of the State of Texas.</p>
          
          <p>C. This Agreement supersedes any prior agreement between the parties hereto concerning the performance of any of the Services specified herein.</p>
          
          <p>D. The parties agree that all calculations required/requested to be made under this Agreement shall be performed under uniform rules and methods applicable to all qualified retirement plans for which SURVIVAL 401K provides Services, and the Plan Administrator hereby adopts such rules and methods.</p>
          
          <p>E. Survival 401k, LLC does not provide legal, tax, or investment advice. Nothing of the foregoing, or of any other written, electronic or oral statement or communication by Survival 401k, LLC or its representatives, is intended to be, or may be relied as, legal, tax or investment advice, statements, opinions or predictions. Prior to making any investment decisions, please consult with the appropriate legal, tax, and investment professionals for advice.</p>
          
          <p className="font-semibold">F. I acknowledge the set up fee of $1,200.00 is payable upon submitting application and the $200.00 annual maintenance fee will be automatically charged on the first day of the anniversary month for each year following the initial application via the same payment method as submitted with this application.</p>
        </AlertDescription>
      </Alert>

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

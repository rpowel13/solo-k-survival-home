
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const DisclaimerAlert = () => {
  return (
    <Alert className="mb-8 bg-amber-50 border-amber-200">
      <InfoIcon className="h-5 w-5 text-amber-500" />
      <AlertDescription className="text-amber-800 space-y-4">
        <h3 className="font-bold text-lg">Agreement For Services</h3>
        <p>I, the Plan Administrator, acknowledge by signing this agreement the responsibility associated with establishing and operating a qualified retirement plan.</p>
        
        <p>This Agreement shall not be construed to appoint SURVIVAL 401K, LLC as a Plan Administrator or as a fiduciary of the Plan. This Agreement shall not be construed to delegate to SURVIVAL 401K, LLC any obligation, responsibility or liability of the Plan Administrator or any other fiduciary of the Plan either expressly or under applicable law.</p>
        
        <p>SURVIVAL 401K, LLC shall exercise no discretion regarding management or administration of the Plan, and shall provide only ministerial services as provided under this agreement.</p>
        
        <p>The obligations, responsibilities and liabilities of SURVIVAL 401K, LLC shall be limited to those provided under this Agreement.</p>
        
        <p>In no event shall SURVIVAL 401K, LLC be liable to the Plan Administrator or any other person or entity for payments of any fees, costs or expenses incurred for accounting, legal or other administrative services rendered in connection with the Plan.</p>
      </AlertDescription>
    </Alert>
  );
};

export default DisclaimerAlert;

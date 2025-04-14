
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const DisclaimerAlert = () => {
  return (
    <Alert className="mb-8 bg-amber-50 border-amber-200">
      <InfoIcon className="h-5 w-5 text-amber-500" />
      <AlertDescription className="text-amber-800">
        <strong>Disclaimer:</strong> Survival 401k is not a law firm, accounting firm, or financial advisory firm, and cannot act as your fiduciary. We provide 
        plan documentation services and general information about retirement plans. Please consult with your attorney, accountant, or financial advisor regarding your specific situation.
      </AlertDescription>
    </Alert>
  );
};

export default DisclaimerAlert;

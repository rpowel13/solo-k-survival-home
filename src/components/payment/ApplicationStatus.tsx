
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ApplicationStatusProps {
  name: string;
  email: string;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ name, email }) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-start">
      <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
      <div>
        <h3 className="font-medium text-green-800">Application Received</h3>
        <p className="text-green-700">
          Thank you for your application, {name}. We've sent a confirmation to {email}.
        </p>
      </div>
    </div>
  );
};

export default ApplicationStatus;


import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

const PaymentDetailsCard: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h3 className="font-medium">Solo 401k Setup Package</h3>
          <p className="text-sm text-gray-500">Complete documentation and filing service</p>
        </div>
        <span className="font-bold text-xl">$1,240.00</span>
      </div>
      
      <div className="pt-2">
        <h4 className="font-medium mb-2">Package Includes:</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
            <span>Complete Solo 401k plan documentation</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
            <span>IRS compliance verification</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
            <span>EIN application assistance</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
            <span>Ongoing support and consultation</span>
          </li>
        </ul>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center">
          <ShieldCheck className="h-5 w-5 text-gray-600 mr-2" />
          <span className="text-sm text-gray-600">Secure payment processing</span>
        </div>
        <div className="text-right">
          <div className="font-bold text-xl">Total: $1,240.00</div>
          <div className="text-sm text-gray-500">One-time payment</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsCard;

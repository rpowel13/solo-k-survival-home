
import React from 'react';
import SectionHeading from '@/components/common/SectionHeading';
import { 
  ShieldCheck, BadgeDollarSign, FileText, 
  Handshake, PiggyBank, Building 
} from 'lucide-react';

const FirstResponderBenefitsSection = () => {
  return (
    <section className="bg-gradient-to-r from-survival-50 to-white p-8 rounded-xl shadow-sm border border-survival-100">
      <SectionHeading className="text-2xl font-bold mb-6 text-survival-800 border-b border-survival-100 pb-2">
        First Responder & Gig Economy Benefits
      </SectionHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
          <ShieldCheck className="h-5 w-5 text-finance-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-survival-800">Asset Protection</h3>
            <p className="text-sm text-gray-600">Separate your personal assets from any liabilities associated with your side business or gig work.</p>
          </div>
        </div>
        
        <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
          <BadgeDollarSign className="h-5 w-5 text-finance-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-survival-800">Tax Advantages</h3>
            <p className="text-sm text-gray-600">Potential deductions for business expenses related to your side gig that may not be available as an individual.</p>
          </div>
        </div>
        
        <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
          <FileText className="h-5 w-5 text-finance-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-survival-800">Simplified Accounting</h3>
            <p className="text-sm text-gray-600">Clearer separation between personal and business finances for easier tax filing and record keeping.</p>
          </div>
        </div>
        
        <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
          <Handshake className="h-5 w-5 text-finance-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-survival-800">Credibility</h3>
            <p className="text-sm text-gray-600">Enhanced professional image when providing services outside your primary role.</p>
          </div>
        </div>
        
        <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
          <PiggyBank className="h-5 w-5 text-finance-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-survival-800">Retirement Planning</h3>
            <p className="text-sm text-gray-600">Access to business retirement plans like Solo 401(k)s with higher contribution limits.</p>
          </div>
        </div>
        
        <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
          <Building className="h-5 w-5 text-finance-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-survival-800">Asset Acquisition</h3>
            <p className="text-sm text-gray-600">Purchase assets like vehicles and equipment through your LLC for better tax treatment.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstResponderBenefitsSection;


import React from 'react';
import SectionHeading from '@/components/common/SectionHeading';

const ProcessMapSection = () => {
  return (
    <section>
      <SectionHeading className="text-3xl font-bold mb-8 text-survival-800 border-b border-gray-200 pb-2">
        Our LLC Formation Process
      </SectionHeading>
      <div className="relative">
        {/* Process timeline line */}
        <div className="absolute left-8 top-10 bottom-10 w-1 bg-survival-100 hidden md:block"></div>
        
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row gap-6 relative">
            <div className="md:w-16 h-16 bg-survival-100 text-survival-800 rounded-full flex items-center justify-center text-xl font-bold shadow-sm flex-shrink-0 z-10">1</div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex-grow">
              <h3 className="text-xl font-semibold mb-3">Consultation</h3>
              <p className="text-gray-700">We start with a detailed consultation to understand your business needs, goals, and specific requirements for your LLC.</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 relative">
            <div className="md:w-16 h-16 bg-survival-100 text-survival-800 rounded-full flex items-center justify-center text-xl font-bold shadow-sm flex-shrink-0 z-10">2</div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex-grow">
              <h3 className="text-xl font-semibold mb-3">Document Preparation</h3>
              <p className="text-gray-700">Our team prepares all necessary formation documents, including Articles of Organization, Operating Agreement, and EIN application.</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 relative">
            <div className="md:w-16 h-16 bg-survival-100 text-survival-800 rounded-full flex items-center justify-center text-xl font-bold shadow-sm flex-shrink-0 z-10">3</div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex-grow">
              <h3 className="text-xl font-semibold mb-3">Filing & Registration</h3>
              <p className="text-gray-700">We file your documents with the appropriate state agency and secure your LLC registration.</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 relative">
            <div className="md:w-16 h-16 bg-survival-100 text-survival-800 rounded-full flex items-center justify-center text-xl font-bold shadow-sm flex-shrink-0 z-10">4</div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex-grow">
              <h3 className="text-xl font-semibold mb-3">EIN & Banking Setup</h3>
              <p className="text-gray-700">We obtain your Federal Employer Identification Number (EIN) and provide banking resolution documents to establish your business accounts.</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 relative">
            <div className="md:w-16 h-16 bg-survival-100 text-survival-800 rounded-full flex items-center justify-center text-xl font-bold shadow-sm flex-shrink-0 z-10">5</div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex-grow">
              <h3 className="text-xl font-semibold mb-3">Compliance Support</h3>
              <p className="text-gray-700">We provide ongoing compliance support for your first year, ensuring you meet all state requirements and deadlines.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessMapSection;

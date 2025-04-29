
import React from 'react';
import SectionHeading from '@/components/common/SectionHeading';

const IntroSection = () => {
  return (
    <section>
      <SectionHeading className="text-3xl font-bold mb-6 text-survival-800 border-b border-gray-200 pb-2" highlightTerm="LLC">
        Why Form an LLC?
      </SectionHeading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-3 text-survival-800">Personal Asset Protection</h3>
          <p className="text-gray-700">
            A Limited Liability Company (LLC) creates a legal separation between your personal and business assets, 
            protecting your personal wealth from business liabilities.
          </p>
        </div>
        
        <div className="bg-survival-50 p-6 rounded-xl shadow-sm border border-survival-100">
          <h3 className="text-xl font-semibold mb-3 text-survival-800">First Responders & Gig Workers</h3>
          <p className="text-gray-700">
            If you're a first responder with side income or working in the gig economy, an LLC can help protect 
            your personal assets while providing tax benefits for your income.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;

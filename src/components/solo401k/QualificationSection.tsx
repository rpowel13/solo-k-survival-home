
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';

const QualificationSection = () => {
  return (
    <section>
      <SectionHeading className="text-2xl font-bold mb-6 text-survival-800">
        Who Qualifies for a Solo 401k?
      </SectionHeading>
      <div className="prose max-w-none">
        <p>To qualify for a Solo 401k, you must:</p>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
            <span>Have self-employment income (full-time or part-time)</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
            <span>Have no full-time employees other than yourself and your spouse</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
            <span>Generate self-employment income through a sole proprietorship, LLC, partnership, or corporation</span>
          </li>
        </ul>
        <p className="mt-4">
          Even if you have a full-time job with an employer-sponsored retirement plan, you can still establish a Solo 401k for your side business or freelance income.
        </p>
      </div>
    </section>
  );
};

export default QualificationSection;

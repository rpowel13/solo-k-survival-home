
import React from 'react';
import SectionHeading from '@/components/common/SectionHeading';

const IntroSection = () => {
  return (
    <section>
      <SectionHeading className="text-2xl font-bold mb-6 text-survival-800">
        What is a Solo 401k?
      </SectionHeading>
      <div className="prose max-w-none">
        <p className="text-lg">
          A Solo 401k, also known as an Individual 401k, is a tax-advantaged retirement plan specifically designed for self-employed individuals and small business owners with no full-time employees (other than a spouse).
        </p>
        <p className="mt-4">
          With a Solo 401k, you can contribute both as the employer and the employee, allowing for significantly higher contribution limits compared to traditional IRAs or even SEP IRAs.
        </p>
      </div>
    </section>
  );
};

export default IntroSection;

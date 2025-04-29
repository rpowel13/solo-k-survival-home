
import React from 'react';
import SectionHeading from '@/components/common/SectionHeading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Building, LineChart, Target } from 'lucide-react';

const FinancialFutureSection = () => {
  return (
    <section className="py-8">
      <SectionHeading className="text-3xl font-bold mb-8 text-survival-800 border-b border-gray-200 pb-2">
        Building Your Financial Future
      </SectionHeading>
      
      <div className="space-y-8">
        <p className="text-lg">
          An LLC is more than just a legal entity—it's a foundational building block for your financial future. Here's how an LLC can help you build wealth and secure your financial goals:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 relative">
            <div className="h-12 w-12 bg-survival-100 rounded-full mb-4 flex items-center justify-center">
              <Building className="h-6 w-6 text-survival-700" />
            </div>
            <h3 className="text-xl font-medium mb-3 text-survival-800">Asset Building</h3>
            <p className="text-gray-600">
              Create a distinct entity to acquire assets, from real estate to investments, with enhanced protection and favorable tax treatment.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 relative">
            <div className="h-12 w-12 bg-survival-100 rounded-full mb-4 flex items-center justify-center">
              <LineChart className="h-6 w-6 text-survival-700" />
            </div>
            <h3 className="text-xl font-medium mb-3 text-survival-800">Tax Optimization</h3>
            <p className="text-gray-600">
              Take advantage of business deductions, retirement plan options, and strategic income planning not available to individuals.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 relative">
            <div className="h-12 w-12 bg-survival-100 rounded-full mb-4 flex items-center justify-center">
              <Target className="h-6 w-6 text-survival-700" />
            </div>
            <h3 className="text-xl font-medium mb-3 text-survival-800">Legacy Planning</h3>
            <p className="text-gray-600">
              Establish a structure that can outlive you, creating a vehicle for generational wealth transfer and business continuity.
            </p>
          </div>
        </div>
        
        <div className="bg-survival-50 rounded-xl p-6 border border-survival-100">
          <h3 className="text-xl font-semibold mb-4 text-survival-800">First Responders: Building Financial Security</h3>
          <p>
            For first responders, an LLC offers a pathway to build financial security beyond your primary career. Whether it's structuring your side business, managing rental properties, or creating a consulting practice, an LLC gives you the flexibility to build wealth while protecting what you've already earned.
          </p>
        </div>
        
        <div className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="retirement-planning">
              <AccordionTrigger className="text-lg font-medium text-survival-800">Retirement Planning with an LLC</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">
                  When you operate through an LLC, you gain access to powerful retirement planning options not available to individuals, including:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Solo 401(k) plans with higher contribution limits than traditional IRAs</li>
                  <li>SEP IRAs that allow for substantial tax-deferred retirement savings</li>
                  <li>The ability to build a self-directed retirement portfolio including alternative assets like real estate, precious metals, and private equity</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="wealth-building">
              <AccordionTrigger className="text-lg font-medium text-survival-800">Wealth Building Strategies</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">
                  Your LLC can serve as the foundation for various wealth-building strategies:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Creating multiple income streams through various business activities</li>
                  <li>Building a portfolio of income-generating assets under the protection of your LLC</li>
                  <li>Establishing business credit separate from your personal credit</li>
                  <li>Structuring joint ventures and partnerships with enhanced liability protection</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="exit-strategies">
              <AccordionTrigger className="text-lg font-medium text-survival-800">Exit Strategies and Business Value</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">
                  A properly structured LLC creates long-term value that can be monetized:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Ability to sell membership interests in your LLC</li>
                  <li>Option to merge with or be acquired by larger entities</li>
                  <li>Creation of a business with transferable value independent of your personal involvement</li>
                  <li>Structured succession planning for family businesses</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FinancialFutureSection;

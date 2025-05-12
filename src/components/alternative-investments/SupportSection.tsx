
import React from 'react';

const SupportSection = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-survival-800">How Survival 401k Supports Your Alternative Investment Strategy</h2>
      <div className="prose max-w-none">
        <p>
          Our Solo 401k plans are specifically designed to maximize your alternative investment opportunities. We provide:
        </p>
        <ul className="mt-4 space-y-4">
          <li className="flex items-start">
            <div className="bg-survival-100 p-1 rounded-full mr-3 mt-1">
              <span className="text-survival-700 font-bold text-sm">1</span>
            </div>
            <div>
              <strong className="text-survival-800">Educational Resources:</strong> Comprehensive guides, webinars, and workshops on various alternative investment strategies.
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-survival-100 p-1 rounded-full mr-3 mt-1">
              <span className="text-survival-700 font-bold text-sm">2</span>
            </div>
            <div>
              <strong className="text-survival-800">Checkbook Control:</strong> Our plans provide direct checkbook control, allowing you to act quickly on investment opportunities without custodian delays.
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-survival-100 p-1 rounded-full mr-3 mt-1">
              <span className="text-survival-700 font-bold text-sm">3</span>
            </div>
            <div>
              <strong className="text-survival-800">Professional Network:</strong> Access to our network of alternative investment specialists, including real estate experts, precious metals dealers, and private equity opportunities.
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-survival-100 p-1 rounded-full mr-3 mt-1">
              <span className="text-survival-700 font-bold text-sm">4</span>
            </div>
            <div>
              <strong className="text-survival-800">Compliance Guidance:</strong> Clear guidelines on prohibited transactions and investment restrictions to keep your retirement plan compliant with IRS regulations.
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-survival-100 p-1 rounded-full mr-3 mt-1">
              <span className="text-survival-700 font-bold text-sm">5</span>
            </div>
            <div>
              <strong className="text-survival-800">Due Diligence Support:</strong> Resources to help you evaluate alternative investment opportunities and conduct proper due diligence.
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SupportSection;

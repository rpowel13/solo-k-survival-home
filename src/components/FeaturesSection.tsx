
import { CheckCircle } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-gray-50 section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">Features of Our Solo 401(k) Plans</h2>
          <p className="text-gray-600 text-lg">
            Survival 401k provides comprehensive solutions tailored to your unique needs.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-survival-700 to-survival-800 py-4 px-6">
              <h3 className="text-xl font-semibold text-white">Plan Features</h3>
            </div>
            <div className="p-6 space-y-4">
              {[
                "Employee and employer contributions up to $69,000 annually (2024)",
                "Traditional pre-tax and Roth after-tax contribution options",
                "Access to a wide range of investment options",
                "Loan provisions up to 50% of account balance or $50,000",
                "Checkbook control for direct investment management",
                "Easy rollovers from existing retirement accounts",
                "Simplified administration and compliance support",
                "Online account access and management tools",
                "Dedicated account representative"
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-survival-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-survival-600">
              <h3 className="font-semibold text-xl text-gray-900 mb-2">For Business Owners</h3>
              <p className="text-gray-600 mb-4">
                As both employer and employee, you can make contributions in both capacities, 
                significantly increasing your annual contribution limit compared to other retirement plans.
              </p>
              <div className="bg-survival-50 p-4 rounded-lg">
                <p className="font-medium text-survival-800">
                  Maximize your retirement savings while minimizing your current tax burden
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-finance-600">
              <h3 className="font-semibold text-xl text-gray-900 mb-2">For Freelancers & Consultants</h3>
              <p className="text-gray-600 mb-4">
                Create retirement security on your own terms with flexible contribution options 
                that adapt to the variable income common in freelance work.
              </p>
              <div className="bg-finance-50 p-4 rounded-lg">
                <p className="font-medium text-finance-800">
                  Build your retirement nest egg even with variable income
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

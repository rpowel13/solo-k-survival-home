
import { BadgeDollarSign, TrendingUp, Search, Shield, PiggyBank, Lightbulb } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

const benefitsData = [
  {
    icon: <TrendingUp className="h-6 w-6 text-white" />,
    title: "Higher Contribution Limits",
    description: "Contribute up to $69,000 annually in 2025, much more than traditional IRAs or standard 401(k) plans."
  },
  {
    icon: <BadgeDollarSign className="h-6 w-6 text-white" />,
    title: "Tax Advantages",
    description: "Choose between traditional tax-deferred or Roth after-tax contributions to optimize your tax strategy."
  },
  {
    icon: <Search className="h-6 w-6 text-white" />,
    title: "Investment Flexibility",
    description: "Access a broader range of investment options compared to employer-sponsored plans."
  },
  {
    icon: <Shield className="h-6 w-6 text-white" />,
    title: "Asset Protection",
    description: "Enjoy strong creditor protection for your retirement assets in most states."
  },
  {
    icon: <PiggyBank className="h-6 w-6 text-white" />,
    title: "Loan Options",
    description: "Borrow from your account if needed, with flexible repayment options not available with IRAs."
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-white" />,
    title: "Simple Administration",
    description: "Minimal paperwork and easy setup process designed specifically for busy entrepreneurs."
  }
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionHeading className="section-title">
            Why Choose a Solo 401(k)?
          </SectionHeading>
          <p className="text-gray-600 text-lg">
            A Solo 401(k) offers substantial advantages for self-employed individuals compared to other retirement options.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefitsData.map((benefit, index) => (
            <div 
              key={index} 
              className="feature-card border border-gray-100 hover:border-survival-200 group" 
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="bg-gradient-to-r from-survival-600 to-survival-700 rounded-lg w-12 h-12 flex items-center justify-center mb-4 shadow-md group-hover:from-survival-700 group-hover:to-survival-800 transition-all duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

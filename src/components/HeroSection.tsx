
import { ArrowRight, ShieldCheck, TrendingUp, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="hero-gradient text-white">
      <div className="container mx-auto section-padding">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:pr-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight animate-fade-in">
              Your Solo Career Deserves a Premium Retirement Plan
            </h1>
            <p className="text-lg md:text-xl opacity-90 animate-fade-in" style={{animationDelay: "0.2s"}}>
              Designed specifically for self-employed professionals and small business owners, Survival 401k provides maximum tax advantages and contribution limits to secure your financial future.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: "0.4s"}}>
              <Button size="lg" className="bg-white text-survival-800 hover:bg-gray-100">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 animate-fade-in" style={{animationDelay: "0.3s"}}>
            <div className="bg-white/95 shadow-xl rounded-xl p-8">
              <h3 className="text-survival-800 text-2xl font-bold mb-6">Why Entrepreneurs Choose Us</h3>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="bg-survival-100 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-survival-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Higher Contribution Limits</h4>
                    <p className="text-gray-600">Contribute up to $69,000 annually (2024)</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-finance-100 p-3 rounded-lg">
                    <ShieldCheck className="h-6 w-6 text-finance-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Strong Asset Protection</h4>
                    <p className="text-gray-600">Safeguard your retirement savings</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-survival-100 p-3 rounded-lg">
                    <PiggyBank className="h-6 w-6 text-survival-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tax-Advantaged Growth</h4>
                    <p className="text-gray-600">Traditional or Roth options available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

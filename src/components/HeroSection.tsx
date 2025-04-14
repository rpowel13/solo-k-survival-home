import { ArrowRight, ShieldCheck, TrendingUp, PiggyBank, Ambulance, Shield, BadgeAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="hero-gradient text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdi02aC02djZoNnptNiAwaDZ2LTZoLTZ2NnptLTEyIDBoLTZ2LTZoNnY2em0tNiAwdi02aC02djZoNnptLTYgMGgtNnY2aDZ2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 mix-blend-overlay"></div>
      <div className="container mx-auto section-padding relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:pr-12">
            <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-2 animate-fade-in">
              Self-Employed Retirement Solutions
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight animate-fade-in">
              Retirement Plans for Entrepreneurs and First Responders
            </h1>
            <p className="text-lg md:text-xl opacity-90 animate-fade-in" style={{animationDelay: "0.2s"}}>
              Designed specifically for self-employed professionals, small business owners, and first responders, Survival 401k provides maximum tax advantages and contribution limits to secure your financial future.
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
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 animate-fade-in shadow-xl" style={{animationDelay: "0.3s"}}>
            <div className="bg-white/95 shadow-xl rounded-xl p-8">
              <h3 className="text-survival-800 text-2xl font-bold mb-6">Why Professionals Choose Us</h3>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="bg-survival-100 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-survival-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Higher Contribution Limits</h4>
                    <p className="text-gray-600">Contribute up to $69,000 annually (2025)</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-finance-100 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-finance-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Dedicated First Responder Support</h4>
                    <p className="text-gray-600">Tailored retirement solutions for heroes</p>
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

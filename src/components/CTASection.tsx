
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-survival-800 to-survival-900 text-white section-padding">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Secure Your Financial Future?</h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Take control of your retirement with a Solo 401(k) plan designed specifically for self-employed individuals like you.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-survival-800 hover:bg-gray-100">
              Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Schedule a Consultation
            </Button>
          </div>
          
          <p className="text-sm opacity-80 mt-6">
            No commitment required. Our retirement specialists are ready to answer your questions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

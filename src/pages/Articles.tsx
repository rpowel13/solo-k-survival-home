
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import WhyChooseSection from "@/components/solo401k/WhyChooseSection";

// Default benefits to display
const defaultArticleBenefits = [
  "Benefit 1: Easy to understand financial concepts",
  "Benefit 2: Step-by-step guides for implementation",
  "Benefit 3: Tax-saving strategies for small businesses",
  "Benefit 4: Retirement planning made simple",
  "Benefit 5: Investment options comparison",
  "Benefit 6: How to maximize your retirement contributions"
];

const Articles = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-survival-800 to-survival-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Resource Library</h1>
              <p className="text-gray-200">
                Insights, guides, and strategies for entrepreneurs and first responders
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <WhyChooseSection 
            title="Financial Resource Highlights"
            subtitle="Explore our key resources designed to help you navigate personal and business finances"
            benefits={defaultArticleBenefits}
            maxCards={6}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;


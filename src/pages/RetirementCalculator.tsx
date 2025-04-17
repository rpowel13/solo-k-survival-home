
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RetirementCalculator from "@/components/RetirementCalculator";
import { Separator } from "@/components/ui/separator";

const RetirementCalculatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Plan Your Financial Future</h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
            Use our comprehensive calculator to simulate your retirement savings growth and see how a Solo 401(k) 
            can maximize your investment potential.
          </p>
          <Separator className="mb-8" />
          <RetirementCalculator />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RetirementCalculatorPage;

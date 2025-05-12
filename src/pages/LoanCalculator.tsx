
import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoanCalculator from "@/components/LoanCalculator";
import { Separator } from "@/components/ui/separator";

const LoanCalculatorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Loan Calculator</h1>
          <h2 className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-8">
            Calculate your loan payments and view a detailed amortization schedule to understand your loan terms better.
          </h2>
          <Separator className="mb-8" />
          <LoanCalculator />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoanCalculatorPage;

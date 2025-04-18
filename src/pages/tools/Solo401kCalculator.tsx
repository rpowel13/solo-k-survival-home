
import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Solo401kCalculator from "@/components/tools/Solo401kCalculator";
import { Separator } from "@/components/ui/separator";

const Solo401kCalculatorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Solo 401(k) Contribution Calculator</h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
            Calculate your maximum Solo 401(k) contribution limits based on your business type and income.
          </p>
          <Separator className="mb-8" />
          <Solo401kCalculator />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Solo401kCalculatorPage;

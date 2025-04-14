
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RetirementCalculator from "@/components/RetirementCalculator";

const RetirementCalculatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <RetirementCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default RetirementCalculatorPage;

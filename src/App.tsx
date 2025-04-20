import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Solo401k from "./pages/services/Solo401k";
import LLCCreation from "./pages/services/LLCCreation";
import FirstResponderPackage from "./pages/services/FirstResponderPackage";
import AlternativeInvestments from "./pages/services/AlternativeInvestments";
import RetirementCalculator from "./pages/RetirementCalculator";
import LoanCalculator from "./pages/LoanCalculator";
import Solo401kApplication from "./pages/applications/Solo401kApplication";
import LLCApplication from "./pages/applications/LLCApplication";
import FirstResponderApplication from "./pages/applications/FirstResponderApplication";
import FirstResponderLLCApplication from "./pages/applications/FirstResponderLLCApplication";
import FirstResponder401kApplication from "./pages/applications/FirstResponder401kApplication";
import AlternativeInvestmentsApplication from "./pages/applications/AlternativeInvestmentsApplication";
import Solo401kPayment from "./pages/payments/Solo401kPayment";
import LLCPayment from "./pages/payments/LLCPayment";
import AnnualFeePayment from "./pages/payments/AnnualFeePayment";
import ReinstatementFeePayment from "./pages/payments/ReinstatementFeePayment";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalDisclosures from "./pages/LegalDisclosures";
import ZapierSettings from "./pages/admin/ZapierSettings";
import FirstResponderPayment from "./pages/payments/FirstResponderPayment";
import RMDCalculator from "./pages/tools/RMDCalculator";
import Solo401kCalculator from "./pages/tools/Solo401kCalculator";
import New401kApplication from "./pages/applications/New401kApplication";
import New401kFormPage from "./pages/applications/New401kFormPage";
import FirstResponderLLCPayment from "./pages/payments/FirstResponderLLCPayment";
import FirstResponder401kPayment from "./pages/payments/FirstResponder401kPayment";
import TestForm from "./pages/TestForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/legal-disclosures" element={<LegalDisclosures />} />
          <Route path="/services/solo-401k" element={<Solo401k />} />
          <Route path="/services/llc-creation" element={<LLCCreation />} />
          <Route path="/services/first-responder-package" element={<FirstResponderPackage />} />
          <Route path="/services/alternative-investments" element={<AlternativeInvestments />} />
          <Route path="/tools/retirement-calculator" element={<RetirementCalculator />} />
          <Route path="/tools/loan-calculator" element={<LoanCalculator />} />
          <Route path="/tools/solo-401k-calculator" element={<Solo401kCalculator />} />
          <Route path="/apply/solo-401k" element={<Solo401kApplication />} />
          <Route path="/apply/llc" element={<LLCApplication />} />
          <Route path="/apply/first-responder" element={<FirstResponderApplication />} />
          <Route path="/apply/alternative-investments" element={<AlternativeInvestmentsApplication />} />
          <Route path="/payment/solo-401k" element={<Solo401kPayment />} />
          <Route path="/payment/llc" element={<LLCPayment />} />
          <Route path="/payment/annual-fee" element={<AnnualFeePayment />} />
          <Route path="/payment/reinstatement-fee" element={<ReinstatementFeePayment />} />
          <Route path="/admin/zapier-settings" element={<ZapierSettings />} />
          <Route path="/payment/first-responder" element={<FirstResponderPayment />} />
          <Route path="/payment/first-responder-llc" element={<FirstResponderLLCPayment />} />
          <Route path="/payment/first-responder-401k" element={<FirstResponder401kPayment />} />
          <Route path="/tools/rmd-calculator" element={<RMDCalculator />} />
          <Route path="/apply/new-solo-401k" element={<New401kApplication />} />
          <Route path="/apply/new-401k-form" element={<New401kFormPage />} />
          <Route path="/apply/first-responder-llc" element={<FirstResponderLLCApplication />} />
          <Route path="/apply/first-responder-401k" element={<FirstResponder401kApplication />} />
          <Route path="/test-form" element={<TestForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

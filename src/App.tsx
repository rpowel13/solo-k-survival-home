import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import './App.css';

// Eagerly load critical pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load non-critical routes
const Contact = lazy(() => import('./pages/Contact'));
const Solo401k = lazy(() => import('./pages/services/Solo401k'));
const LLCCreation = lazy(() => import('./pages/services/LLCCreation'));
const FirstResponderPackage = lazy(() => import('./pages/services/FirstResponderPackage'));
const AlternativeInvestments = lazy(() => import('./pages/services/AlternativeInvestments'));
const RetirementCalculator = lazy(() => import('./pages/RetirementCalculator'));
const LoanCalculator = lazy(() => import('./pages/LoanCalculator'));
const Solo401kApplication = lazy(() => import('./pages/applications/Solo401kApplication'));
const LLCApplication = lazy(() => import('./pages/applications/LLCApplication'));
const FirstResponderApplication = lazy(() => import('./pages/applications/FirstResponderApplication'));
const FirstResponderLLCApplication = lazy(() => import('./pages/applications/FirstResponderLLCApplication'));
const FirstResponder401kApplication = lazy(() => import('./pages/applications/FirstResponder401kApplication'));
const AlternativeInvestmentsApplication = lazy(() => import('./pages/applications/AlternativeInvestmentsApplication'));
const Solo401kPayment = lazy(() => import('./pages/payments/Solo401kPayment'));
const LLCPayment = lazy(() => import('./pages/payments/LLCPayment'));
const AnnualFeePayment = lazy(() => import('./pages/payments/AnnualFeePayment'));
const ReinstatementFeePayment = lazy(() => import('./pages/payments/ReinstatementFeePayment'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const LegalDisclosures = lazy(() => import('./pages/LegalDisclosures'));
const ZapierSettings = lazy(() => import('./pages/admin/ZapierSettings'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const FirstResponderPayment = lazy(() => import('./pages/payments/FirstResponderPayment'));
const RMDCalculator = lazy(() => import('./pages/tools/RMDCalculator'));
const Solo401kCalculator = lazy(() => import('./pages/tools/Solo401kCalculator'));
const New401kApplication = lazy(() => import('./pages/applications/New401kApplication'));
const New401kFormPage = lazy(() => import('./pages/applications/New401kFormPage'));
const FirstResponderLLCPayment = lazy(() => import('./pages/payments/FirstResponderLLCPayment'));
const FirstResponder401kPayment = lazy(() => import('./pages/payments/FirstResponder401kPayment'));
const TestForm = lazy(() => import('./pages/TestForm'));
const Learning = lazy(() => import('./pages/Learning'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {/* Router must wrap everything */}
          <Router>
            <Suspense fallback={<PageLoader />}>
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
                <Route path="/admin" element={<AdminDashboard />} />
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
                <Route path="/learning" element={<Learning />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Router>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

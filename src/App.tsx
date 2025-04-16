
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
import Solo401kApplication from "./pages/applications/Solo401kApplication";
import LLCApplication from "./pages/applications/LLCApplication";
import FirstResponderApplication from "./pages/applications/FirstResponderApplication";
import AlternativeInvestmentsApplication from "./pages/applications/AlternativeInvestmentsApplication";
import Solo401kPayment from "./pages/payments/Solo401kPayment";
import AnnualFeePayment from "./pages/payments/AnnualFeePayment";
import ReinstatementFeePayment from "./pages/payments/ReinstatementFeePayment";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalDisclosures from "./pages/LegalDisclosures";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogEditor from "./pages/BlogEditor";

const queryClient = new QueryClient();

// Protected route component to check for blog admin authentication
const ProtectedBlogRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = sessionStorage.getItem("blogAdminAuthenticated") === "true";
  
  // If user is not authenticated and trying to access admin routes, redirect to login
  if (!isAuthenticated) {
    // The BlogEditor component will handle showing the login form
    return children;
  }
  
  // If authenticated, render the requested route
  return children;
};

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
          <Route path="/apply/solo-401k" element={<Solo401kApplication />} />
          <Route path="/apply/llc" element={<LLCApplication />} />
          <Route path="/apply/first-responder" element={<FirstResponderApplication />} />
          <Route path="/apply/alternative-investments" element={<AlternativeInvestmentsApplication />} />
          <Route path="/payment/solo-401k" element={<Solo401kPayment />} />
          <Route path="/payment/annual-fee" element={<AnnualFeePayment />} />
          <Route path="/payment/reinstatement-fee" element={<ReinstatementFeePayment />} />
          {/* Blog Routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* Protected Blog Editor Routes */}
          <Route path="/blog/new" element={<ProtectedBlogRoute><BlogEditor /></ProtectedBlogRoute>} />
          <Route path="/blog/edit/:slug" element={<ProtectedBlogRoute><BlogEditor /></ProtectedBlogRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

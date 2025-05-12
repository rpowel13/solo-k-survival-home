
import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Home, Contact, LogIn, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

// Lazy load dropdown components
const ServiceDropdown = lazy(() => import("./ServiceDropdown").then(module => ({ default: module.ServiceDropdown })));
const ToolsDropdown = lazy(() => import("./ToolsDropdown").then(module => ({ default: module.ToolsDropdown })));
const ApplicationDropdown = lazy(() => import("./ApplicationDropdown").then(module => ({ default: module.ApplicationDropdown })));
const PaymentDropdown = lazy(() => import("./PaymentDropdown").then(module => ({ default: module.PaymentDropdown })));

export const DesktopNav = () => {
  return (
    <nav className="hidden lg:flex space-x-6 items-center">
      <Link 
        to="/" 
        className="text-gray-700 hover:text-survival-600 transition flex items-center"
      >
        <Home className="h-4 w-4 mr-1" />
        Home
      </Link>
      
      <Suspense fallback={<span className="text-gray-500">Services</span>}>
        <ServiceDropdown />
      </Suspense>
      
      <Suspense fallback={<span className="text-gray-500">Applications</span>}>
        <ApplicationDropdown />
      </Suspense>
      
      <Suspense fallback={<span className="text-gray-500">Payments</span>}>
        <PaymentDropdown />
      </Suspense>
      
      <Suspense fallback={<span className="text-gray-500">Tools</span>}>
        <ToolsDropdown />
      </Suspense>
      
      <Link 
        to="/learning" 
        className="text-gray-700 hover:text-survival-600 transition flex items-center"
      >
        <BookOpen className="h-4 w-4 mr-1" />
        Learning
      </Link>
      
      <Link 
        to="/contact" 
        className="text-gray-700 hover:text-survival-600 transition flex items-center"
      >
        <Contact className="h-4 w-4 mr-1" />
        Contact
      </Link>
      
      <Button 
        asChild
        className="bg-blue-500 hover:bg-blue-600"
      >
        <a 
          href="https://live.vcita.com/site/izk040b42jnjcf3c/activity/dashboard" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center"
        >
          <LogIn className="h-4 w-4 mr-1" />
          Portal
        </a>
      </Button>
    </nav>
  );
};

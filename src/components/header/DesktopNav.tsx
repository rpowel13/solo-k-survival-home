
import { Link } from "react-router-dom";
import { ServiceDropdown } from "./ServiceDropdown";
import { ToolsDropdown } from "./ToolsDropdown";
import { ApplicationDropdown } from "./ApplicationDropdown";
import { PaymentDropdown } from "./PaymentDropdown";
import { Home, Contact, LogIn, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <ServiceDropdown />
      <ApplicationDropdown />
      <PaymentDropdown />
      <ToolsDropdown />
      <Link 
        to="/resources" 
        className="text-gray-700 hover:text-survival-600 transition flex items-center"
      >
        <BookOpen className="h-4 w-4 mr-1" />
        Resources
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

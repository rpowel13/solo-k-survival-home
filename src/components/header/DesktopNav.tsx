
import { Link } from "react-router-dom";
import { ServiceDropdown } from "./ServiceDropdown";
import { ToolsDropdown } from "./ToolsDropdown";
import { ApplicationDropdown } from "./ApplicationDropdown";
import { PaymentDropdown } from "./PaymentDropdown";
import { FileText } from "lucide-react";

export const DesktopNav = () => {
  return (
    <nav className="hidden lg:flex space-x-6 items-center">
      <ServiceDropdown />
      <ToolsDropdown />
      <ApplicationDropdown />
      <PaymentDropdown />
      <Link 
        to="/contact" 
        className="text-gray-700 hover:text-survival-600 transition"
      >
        Contact
      </Link>
      <Link 
        to="/articles" 
        className="text-gray-700 hover:text-survival-600 transition flex items-center"
      >
        <FileText className="h-4 w-4 mr-1" />
        Articles
      </Link>
    </nav>
  );
};

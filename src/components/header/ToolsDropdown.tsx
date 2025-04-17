
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { Calculator, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

export const ToolsDropdown = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="h-9 text-gray-600 hover:text-survival-700 font-medium bg-transparent">Retirement Tools</NavigationMenuTrigger>
      <NavigationMenuContent className="bg-white min-w-[200px]">
        <div className="p-1.5 space-y-1">
          <Link 
            to="/tools/retirement-calculator" 
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-survival-50 hover:text-survival-800 text-gray-700"
          >
            <Calculator className="h-4 w-4" />
            <span>Retirement Calculator</span>
          </Link>
          <Link 
            to="/tools/loan-calculator" 
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-survival-50 hover:text-survival-800 text-gray-700"
          >
            <DollarSign className="h-4 w-4" />
            <span>Loan Calculator</span>
          </Link>
          <Link 
            to="/tools/rmd-calculator" 
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-survival-50 hover:text-survival-800 text-gray-700"
          >
            <Calculator className="h-4 w-4" />
            <span>RMD Calculator</span>
          </Link>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

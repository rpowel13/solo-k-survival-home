
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { Calculator } from "lucide-react";
import { Link } from "react-router-dom";

export const ToolsDropdown = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="h-9">Tools</NavigationMenuTrigger>
      <NavigationMenuContent className="bg-white min-w-[200px]">
        <div className="p-1.5">
          <Link 
            to="/tools/retirement-calculator" 
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700"
          >
            <Calculator className="h-4 w-4" />
            <span>Retirement Calculator</span>
          </Link>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

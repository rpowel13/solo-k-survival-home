
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { ServiceDropdown } from "./ServiceDropdown";
import { ApplicationDropdown } from "./ApplicationDropdown";
import { PaymentDropdown } from "./PaymentDropdown";
import { ToolsDropdown } from "./ToolsDropdown";

export const DesktopNav = () => {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link to="/" className="text-gray-600 hover:text-survival-700 hover:bg-survival-50 rounded-md px-2 py-1 transition-colors font-bold">Home</Link>
      
      <NavigationMenu>
        <NavigationMenuList>
          <ServiceDropdown />
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <ApplicationDropdown />
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <PaymentDropdown />
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <ToolsDropdown />
        </NavigationMenuList>
      </NavigationMenu>
      
      <Link to="/blog" className="text-gray-600 hover:text-survival-700 hover:bg-survival-50 rounded-md px-2 py-1 transition-colors font-bold">Blog</Link>
      
      <Link to="/contact" className="text-gray-600 hover:text-survival-700 hover:bg-survival-50 rounded-md px-2 py-1 transition-colors font-bold">Contact</Link>
      
      <a 
        href="https://live.vcita.com/site/izk040b42jnjcf3c/activity/dashboard" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-full"
      >
        <Button 
          size="sm" 
          className="bg-survival-600 hover:bg-survival-700 text-white font-bold"
        >
          <LogIn className="mr-1 h-3 w-3" />
          Portal
        </Button>
      </a>
    </nav>
  );
};

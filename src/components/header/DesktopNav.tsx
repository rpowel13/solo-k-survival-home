
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { ServiceDropdown } from "./ServiceDropdown";
import { ApplicationDropdown } from "./ApplicationDropdown";
import { PaymentDropdown } from "./PaymentDropdown";

export const DesktopNav = () => {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link to="/" className="text-gray-600 hover:text-survival-700 font-medium transition-colors">Home</Link>
      
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
      
      <Link to="/contact" className="text-gray-600 hover:text-survival-700 font-medium transition-colors">Contact</Link>
      
      <a 
        href="https://live.vcita.com/site/izk040b42jnjcf3c/activity/dashboard" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-full"
      >
        <Button className="bg-survival-600 hover:bg-survival-700 text-white">
          <LogIn className="mr-2 h-4 w-4" />
          Customer Portal
        </Button>
      </a>
    </nav>
  );
};

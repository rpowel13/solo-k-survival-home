
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { ServiceDropdown } from "./ServiceDropdown";
import { ApplicationDropdown } from "./ApplicationDropdown";

export const DesktopNav = () => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
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

      <a 
        href="https://live.vcita.com/site/izk040b42jnjcf3c/activity/dashboard" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-600 hover:text-survival-700 font-medium transition-colors flex items-center gap-2"
      >
        <User className="h-4 w-4" />
        Customer Portal
      </a>

      <Link to="/contact" className="text-gray-600 hover:text-survival-700 font-medium transition-colors">Contact</Link>
      <Button className="bg-survival-600 hover:bg-survival-700 text-white">Get Started</Button>
    </nav>
  );
};

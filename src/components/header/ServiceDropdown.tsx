
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Home, Building2, Shield, Coins } from "lucide-react";

export const ServiceDropdown = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-600 hover:text-survival-700 font-bold bg-transparent">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-survival-50 to-survival-100 p-6 no-underline outline-none focus:shadow-md"
                    to="/services/solo-401k"
                    onClick={scrollToTop}
                  >
                    <div className="mb-2 mt-4 text-lg font-medium text-survival-800 flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      Solo 401k
                    </div>
                    <p className="text-sm leading-tight text-survival-700">
                      Retirement plans designed specifically for the self-employed and small business owners.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/services/llc-creation"
                    onClick={scrollToTop}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-survival-50 hover:text-survival-800 focus:bg-survival-50 focus:text-survival-800"
                  >
                    <div className="text-sm font-medium leading-none flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      LLC Creation
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-survival-700">
                      Create your business entity with our step-by-step LLC formation service.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/services/first-responder-package"
                    onClick={scrollToTop}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-survival-50 hover:text-survival-800 focus:bg-survival-50 focus:text-survival-800"
                  >
                    <div className="text-sm font-medium leading-none flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      First Responder
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-survival-700">
                      Specialized LLC and Solo 401k package for first responders.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/services/alternative-investments"
                    onClick={scrollToTop}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-survival-50 hover:text-survival-800 focus:bg-survival-50 focus:text-survival-800"
                  >
                    <div className="text-sm font-medium leading-none flex items-center gap-2">
                      <Coins className="h-4 w-4" />
                      Alternative Investments
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-survival-700">
                      Discover investment options beyond traditional stocks and bonds.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

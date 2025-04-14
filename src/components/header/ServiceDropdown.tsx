
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

export const ServiceDropdown = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-gray-600 hover:text-survival-700 font-medium bg-transparent">
        Services
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <Link
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-survival-50 to-survival-100 p-6 no-underline outline-none focus:shadow-md"
                to="/services/solo-401k"
              >
                <div className="mb-2 mt-4 text-lg font-medium text-survival-800">
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
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="text-sm font-medium leading-none">LLC Creation</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Create your business entity with our step-by-step LLC formation service.
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/services/first-responder-package"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="text-sm font-medium leading-none">First Responder Package</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Specialized LLC and Solo 401k package for first responders.
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/services/alternative-investments"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="text-sm font-medium leading-none">Alternative Investments</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Discover investment options beyond traditional stocks and bonds.
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/services/metal-prices"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="text-sm font-medium leading-none">Gold & Silver Prices</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  View current market prices for precious metals.
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

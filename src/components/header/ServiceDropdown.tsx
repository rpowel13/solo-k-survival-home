
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
      <NavigationMenuTrigger className="text-gray-600 hover:text-survival-700 font-bold bg-transparent">
        Services
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[300px] gap-3 p-4 md:grid-cols-1">
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/services/solo-401k"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-survival-50 hover:text-survival-800 focus:bg-survival-50 focus:text-survival-800"
              >
                <div className="text-sm font-medium leading-none">Solo 401k</div>
                <p className="line-clamp-2 text-sm leading-snug text-survival-700">
                  Retirement planning for business owners
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/services/llc-creation"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-survival-50 hover:text-survival-800 focus:bg-survival-50 focus:text-survival-800"
              >
                <div className="text-sm font-medium leading-none">LLC Formation</div>
                <p className="line-clamp-2 text-sm leading-snug text-survival-700">
                  Business entity formation and protection
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/services/alternative-investments"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-survival-50 hover:text-survival-800 focus:bg-survival-50 focus:text-survival-800"
              >
                <div className="text-sm font-medium leading-none">Alternative Investments</div>
                <p className="line-clamp-2 text-sm leading-snug text-survival-700">
                  Investment opportunities beyond traditional markets
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

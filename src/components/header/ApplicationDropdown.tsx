
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

export const ApplicationDropdown = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-gray-600 hover:text-survival-700 font-bold bg-transparent">
        Applications
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[300px] gap-3 p-4 md:grid-cols-1">
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/apply/solo-401k"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-survival-50 hover:text-survival-800 focus:bg-survival-50 focus:text-survival-800"
              >
                <div className="text-sm font-medium leading-none">Solo 401k Application</div>
                <p className="line-clamp-2 text-sm leading-snug text-survival-700">
                  Apply for your Solo 401k retirement plan
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/apply/llc"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-survival-50 hover:text-survival-800 focus:bg-survival-50 focus:text-survival-800"
              >
                <div className="text-sm font-medium leading-none">LLC Application</div>
                <p className="line-clamp-2 text-sm leading-snug text-survival-700">
                  Start your LLC formation process
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/apply/first-responder"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-survival-50 hover:text-survival-800 focus:bg-survival-50 focus:text-survival-800"
              >
                <div className="text-sm font-medium leading-none">First Responder Package</div>
                <p className="line-clamp-2 text-sm leading-snug text-survival-700">
                  Apply for First Responder combined services
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/apply/first-responder-llc"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-survival-50 hover:text-survival-800 focus:bg-survival-50 focus:text-survival-800"
              >
                <div className="text-sm font-medium leading-none">First Responder LLC</div>
                <p className="line-clamp-2 text-sm leading-snug text-survival-700">
                  Apply for First Responder LLC formation
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/apply/first-responder-401k"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-survival-50 hover:text-survival-800 focus:bg-survival-50 focus:text-survival-800"
              >
                <div className="text-sm font-medium leading-none">First Responder Solo 401k</div>
                <p className="line-clamp-2 text-sm leading-snug text-survival-700">
                  Apply for First Responder Solo 401k
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/apply/alternative-investments"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-survival-50 hover:text-survival-800 focus:bg-survival-50 focus:text-survival-800"
              >
                <div className="text-sm font-medium leading-none">Alternative Investments</div>
                <p className="line-clamp-2 text-sm leading-snug text-survival-700">
                  Apply for Alternative Investment opportunities
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

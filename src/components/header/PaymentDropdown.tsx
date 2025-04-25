
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CreditCard, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const PaymentDropdown = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-600 hover:text-survival-700 font-bold bg-transparent">
            Payments
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/payment/annual-fee"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-survival-50 hover:text-survival-800 focus:bg-survival-50 focus:text-survival-800"
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-survival-600" />
                      <div className="text-sm font-medium leading-none">Annual Fee ($200)</div>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-survival-700 pt-1">
                      Pay your annual fee to maintain your Solo 401k plan in good standing.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/payment/reinstatement-fee"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-survival-50 hover:text-survival-800 focus:bg-survival-50 focus:text-survival-800"
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-survival-600" />
                      <div className="text-sm font-medium leading-none">Reinstatement Fee ($250)</div>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-survival-700 pt-1">
                      Reinstate your Solo 401k plan and bring it back into good standing.
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

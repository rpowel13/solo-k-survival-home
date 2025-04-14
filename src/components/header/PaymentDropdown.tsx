
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CreditCard, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

export const PaymentDropdown = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-gray-600 hover:text-survival-700 font-medium bg-transparent">
        Payments
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4">
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/payment/annual-fee"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-survival-600" />
                  <div className="text-sm font-medium leading-none">Annual Fee ($200)</div>
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground pt-1">
                  Pay your annual fee to maintain your Solo 401k plan in good standing.
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/payment/reinstatement-fee"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-survival-600" />
                  <div className="text-sm font-medium leading-none">Reinstatement Fee ($250)</div>
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground pt-1">
                  Reinstate your Solo 401k plan and bring it back into good standing.
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

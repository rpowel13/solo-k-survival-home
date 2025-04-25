
import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Calculator, Settings } from "lucide-react"

export function ToolsDropdown() {
  const items = [
    { href: "/tools/retirement-calculator", label: "Retirement Calculator", icon: Calculator },
    { href: "/tools/rmd-calculator", label: "RMD Calculator", icon: Calculator },
    { href: "/tools/loan-calculator", label: "Loan Calculator", icon: Calculator },
    { href: "/tools/solo-401k-calculator", label: "Solo 401k Calculator", icon: Settings },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="text-gray-600 hover:text-survival-700 hover:bg-survival-50 rounded-md px-2 py-1 transition-colors font-bold text-sm"
        >
          Tools
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link to={item.href} className="flex items-center gap-2">
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

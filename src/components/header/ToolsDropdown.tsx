
import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react"

export function ToolsDropdown() {
  const items = [
    { href: "/tools/retirement-calculator", label: "Retirement Calculator" },
    { href: "/tools/rmd-calculator", label: "RMD Calculator" },
    { href: "/tools/solo-401k-calculator", label: "Solo 401k Calculator" },
    { href: "/test-form", label: "Test Form" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2">
          Tools
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link to={item.href}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

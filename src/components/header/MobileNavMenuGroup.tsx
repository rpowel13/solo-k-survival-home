
import { ReactNode } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavMenuGroupProps {
  label: string;
  icon: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

const MobileNavMenuGroup = ({
  label,
  icon,
  isOpen,
  onToggle,
  children
}: MobileNavMenuGroupProps) => (
  <div>
    <button 
      onClick={onToggle}
      className="flex items-center justify-between w-full mb-2 font-medium"
    >
      <div className="flex items-center">
        {icon}
        <span>{label}</span>
      </div>
      {isOpen ? (
        <ChevronDown className="h-5 w-5" />
      ) : (
        <ChevronRight className="h-5 w-5" />
      )}
    </button>
    {isOpen && (
      <div className="pl-4 space-y-3 mb-4">
        {children}
      </div>
    )}
  </div>
);

export default MobileNavMenuGroup;

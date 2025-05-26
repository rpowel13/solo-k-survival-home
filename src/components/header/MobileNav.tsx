import { useState } from "react";
import { Link } from "react-router-dom";
import { X, ChevronDown, ChevronRight, Home, Contact, BookOpen, FolderInput, CreditCard, Wrench, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileNavMenuGroup from "./MobileNavMenuGroup";
import MobileNavLinkGroup from "./MobileNavLinkGroup";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    if (openSubmenu === menu) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(menu);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex justify-end"
      onClick={onClose}
      style={{ touchAction: "pan-y" }}
    >
      <div 
        className="w-[280px] bg-white h-screen overflow-y-auto shadow-xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg text-survival-900">Menu</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-64px)]">
          <MobileNavLinkGroup className="border-b pb-4">
            <Link 
              to="/" 
              className="block font-medium hover:text-survival-600 flex items-center"
              onClick={onClose}
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
          </MobileNavLinkGroup>
          
          <MobileNavMenuGroup
            label="Services"
            icon={<BookOpen className="h-4 w-4 mr-1" />}
            isOpen={openSubmenu === "services"}
            onToggle={() => toggleSubmenu("services")}
          >
            <Link 
              to="/services/solo-401k" 
              className="block text-gray-600 hover:text-survival-600"
              onClick={onClose}
            >
              Solo 401(k)
            </Link>
            <Link 
              to="/services/llc-creation" 
              className="block text-gray-600 hover:text-survival-600"
              onClick={onClose}
            >
              LLC Creation
            </Link>
            <Link 
              to="/services/first-responder-package" 
              className="block text-gray-600 hover:text-survival-600"
              onClick={onClose}
            >
              First Responder Package
            </Link>
            <Link 
              to="/services/alternative-investments" 
              className="block text-gray-600 hover:text-survival-600"
              onClick={onClose}
            >
              Alternative Investments
            </Link>
          </MobileNavMenuGroup>

          <MobileNavMenuGroup
            label="Applications"
            icon={<FolderInput className="h-4 w-4 mr-1" />}
            isOpen={openSubmenu === "applications"}
            onToggle={() => toggleSubmenu("applications")}
          >
            <Link 
              to="/apply/solo-401k" 
              className="block text-gray-600 hover:text-survival-600"
              onClick={onClose}
            >
              Solo 401(k) Application
            </Link>
            <Link 
              to="/apply/llc" 
              className="block text-gray-600 hover:text-survival-600"
              onClick={onClose}
            >
              LLC Application
            </Link>
            <Link 
              to="/apply/alternative-investments" 
              className="block text-gray-600 hover:text-survival-600"
              onClick={onClose}
            >
              Alternative Investments
            </Link>
          </MobileNavMenuGroup>

          <MobileNavMenuGroup
            label="Payments"
            icon={<CreditCard className="h-4 w-4 mr-1" />}
            isOpen={openSubmenu === "payments"}
            onToggle={() => toggleSubmenu("payments")}
          >
            <Link 
              to="/payment/annual-fee" 
              className="block text-gray-600 hover:text-survival-600"
              onClick={onClose}
            >
              Annual Fee Payment
            </Link>
            <Link 
              to="/payment/reinstatement-fee" 
              className="block text-gray-600 hover:text-survival-600"
              onClick={onClose}
            >
              Reinstatement Fee Payment
            </Link>
          </MobileNavMenuGroup>

          <MobileNavMenuGroup
            label="Tools"
            icon={<Wrench className="h-4 w-4 mr-1" />}
            isOpen={openSubmenu === "tools"}
            onToggle={() => toggleSubmenu("tools")}
          >
            <Link 
              to="/tools/retirement-calculator" 
              className="block text-gray-600 hover:text-survival-600"
              onClick={onClose}
            >
              Retirement Calculator
            </Link>
            <Link 
              to="/tools/rmd-calculator" 
              className="block text-gray-600 hover:text-survival-600"
              onClick={onClose}
            >
              RMD Calculator
            </Link>
            <Link 
              to="/tools/loan-calculator" 
              className="block text-gray-600 hover:text-survival-600"
              onClick={onClose}
            >
              Loan Calculator
            </Link>
            <Link 
              to="/tools/solo-401k-calculator" 
              className="block text-gray-600 hover:text-survival-600"
              onClick={onClose}
            >
              Solo 401(k) Calculator
            </Link>
          </MobileNavMenuGroup>
          
          <MobileNavLinkGroup>
            <Link 
              to="/resources" 
              className="block font-medium hover:text-survival-600 flex items-center"
              onClick={onClose}
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Resources
            </Link>
          </MobileNavLinkGroup>
          
          <MobileNavLinkGroup>
            <Link 
              to="/learning" 
              className="block font-medium hover:text-survival-600 flex items-center"
              onClick={onClose}
            >
              <GraduationCap className="h-4 w-4 mr-1" />
              Learning
            </Link>
          </MobileNavLinkGroup>
          
          <MobileNavLinkGroup className="pt-2 border-t">
            <Link 
              to="/contact" 
              className="block font-medium hover:text-survival-600 flex items-center"
              onClick={onClose}
            >
              <Contact className="h-4 w-4 mr-1" />
              Contact
            </Link>
          </MobileNavLinkGroup>
        </div>
      </div>
    </div>
  );
};

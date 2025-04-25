import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Menu, ChevronDown, ChevronRight, FileText, Home, Contact } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  if (!isOpen) return null;

  return (
    <div className="lg:hidden">
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose}>
          <div 
            className="fixed right-0 top-0 bottom-0 w-[280px] bg-white z-50 shadow-xl overflow-auto"
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
            
            <div className="p-4 space-y-6">
              <div className="space-y-3 border-b pb-4">
                <Link 
                  to="/" 
                  className="block font-medium hover:text-survival-600 flex items-center"
                  onClick={onClose}
                >
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Link>
              </div>
              
              {/* Services */}
              <div>
                <button 
                  onClick={() => toggleSubmenu('services')}
                  className="flex items-center justify-between w-full mb-2 font-medium"
                >
                  <span>Services</span>
                  {openSubmenu === 'services' ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
                
                {openSubmenu === 'services' && (
                  <div className="pl-4 space-y-3 mb-4">
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
                  </div>
                )}
              </div>
              
              {/* Applications */}
              <div>
                <button 
                  onClick={() => toggleSubmenu('applications')}
                  className="flex items-center justify-between w-full mb-2 font-medium"
                >
                  <span>Applications</span>
                  {openSubmenu === 'applications' ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
                
                {openSubmenu === 'applications' && (
                  <div className="pl-4 space-y-3 mb-4">
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
                      to="/apply/first-responder" 
                      className="block text-gray-600 hover:text-survival-600"
                      onClick={onClose}
                    >
                      First Responder Application
                    </Link>
                    <Link 
                      to="/apply/alternative-investments" 
                      className="block text-gray-600 hover:text-survival-600"
                      onClick={onClose}
                    >
                      Alternative Investments
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Payments */}
              <div>
                <button 
                  onClick={() => toggleSubmenu('payments')}
                  className="flex items-center justify-between w-full mb-2 font-medium"
                >
                  <span>Payments</span>
                  {openSubmenu === 'payments' ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
                
                {openSubmenu === 'payments' && (
                  <div className="pl-4 space-y-3 mb-4">
                    <Link 
                      to="/payment/solo-401k" 
                      className="block text-gray-600 hover:text-survival-600"
                      onClick={onClose}
                    >
                      Solo 401(k) Payment
                    </Link>
                    <Link 
                      to="/payment/llc" 
                      className="block text-gray-600 hover:text-survival-600"
                      onClick={onClose}
                    >
                      LLC Payment
                    </Link>
                    <Link 
                      to="/payment/first-responder" 
                      className="block text-gray-600 hover:text-survival-600"
                      onClick={onClose}
                    >
                      First Responder Payment
                    </Link>
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
                  </div>
                )}
              </div>
              
              {/* Tools */}
              <div>
                <button 
                  onClick={() => toggleSubmenu('tools')}
                  className="flex items-center justify-between w-full mb-2 font-medium"
                >
                  <span>Tools</span>
                  {openSubmenu === 'tools' ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
                
                {openSubmenu === 'tools' && (
                  <div className="pl-4 space-y-3 mb-4">
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
                  </div>
                )}
              </div>
              
              {/* Main Nav Links */}
              <div className="space-y-3 pt-2 border-t">
                <Link 
                  to="/articles" 
                  className="block font-medium hover:text-survival-600 flex items-center"
                  onClick={onClose}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Articles
                </Link>
                <Link 
                  to="/contact" 
                  className="block font-medium hover:text-survival-600 flex items-center"
                  onClick={onClose}
                >
                  <Contact className="h-4 w-4 mr-1" />
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

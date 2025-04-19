
import { Button } from "@/components/ui/button";
import { LogIn, Calculator, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface MobileNavProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="overflow-y-auto max-h-screen w-[85vw] py-6">
        <div className="space-y-4">
          <Link 
            to="/" 
            className="block text-gray-600 hover:text-survival-700 hover:bg-survival-50 py-2 px-2 rounded-md transition-colors font-bold"
            onClick={onClose}
          >
            Home
          </Link>
          
          <div className="border-b pb-2 mb-2">
            <div className="font-bold mb-2 text-gray-700">Services</div>
            <Link to="/services/solo-401k" className="block text-gray-600 hover:text-survival-700 hover:bg-survival-50 py-1 px-4 rounded-md transition-colors font-bold" onClick={onClose}>Solo 401k</Link>
            <Link to="/services/llc-creation" className="block text-gray-600 hover:text-survival-700 hover:bg-survival-50 py-1 px-4 rounded-md transition-colors font-bold" onClick={onClose}>LLC Creation</Link>
            <Link to="/services/alternative-investments" className="block text-gray-600 hover:text-survival-700 hover:bg-survival-50 py-1 px-4 rounded-md transition-colors font-bold" onClick={onClose}>Alternative Investments</Link>
          </div>

          <div className="border-b pb-2 mb-2">
            <div className="font-bold mb-2 text-gray-700">Applications</div>
            <Link to="/apply/solo-401k" className="block text-gray-600 hover:text-survival-700 hover:bg-survival-50 py-1 px-4 rounded-md transition-colors font-bold" onClick={onClose}>Solo 401k Application</Link>
            <Link to="/apply/llc" className="block text-gray-600 hover:text-survival-700 hover:bg-survival-50 py-1 px-4 rounded-md transition-colors font-bold" onClick={onClose}>LLC Application</Link>
            <Link to="/apply/alternative-investments" className="block text-gray-600 hover:text-survival-700 hover:bg-survival-50 py-1 px-4 rounded-md transition-colors font-bold" onClick={onClose}>Alternative Investments</Link>
          </div>

          <Link to="/contact" className="block text-gray-600 hover:text-survival-700 hover:bg-survival-50 py-2 px-2 rounded-md transition-colors font-bold" onClick={onClose}>Contact</Link>
          
          <a 
            href="https://live.vcita.com/site/izk040b42jnjcf3c/activity/dashboard" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full block"
          >
            <Button className="w-full bg-survival-600 hover:bg-survival-700 text-white font-bold">
              <LogIn className="mr-2 h-4 w-4" />
              Customer Portal
            </Button>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
};

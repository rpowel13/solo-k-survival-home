import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileNavProps {
  isOpen: boolean;
}

export const MobileNav = ({ isOpen }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden py-4 space-y-4 animate-fade-in">
      <Link to="/" className="block text-gray-600 hover:text-survival-700 font-medium py-2 transition-colors">Home</Link>
      
      <div className="border-b pb-2 mb-2">
        <div className="font-medium mb-2">Services</div>
        <Link to="/services/solo-401k" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">Solo 401k</Link>
        <Link to="/services/llc-creation" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">LLC Creation</Link>
        <Link to="/services/first-responder-package" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">First Responder Package</Link>
        <Link to="/services/alternative-investments" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">Alternative Investments</Link>
        <Link to="/services/metal-prices" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">Gold & Silver Prices</Link>
      </div>

      <div className="border-b pb-2 mb-2">
        <div className="font-medium mb-2">Applications</div>
        <Link to="/apply/solo-401k" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">Solo 401k Application</Link>
        <Link to="/apply/llc" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">LLC Application</Link>
        <Link to="/apply/first-responder" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">First Responder Package</Link>
        <Link to="/apply/alternative-investments" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">Alternative Investments</Link>
      </div>

      <div className="border-b pb-2 mb-2">
        <div className="font-medium mb-2">Payments</div>
        <Link to="/payment/annual-fee" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">Annual Fee ($200)</Link>
        <Link to="/payment/reinstatement-fee" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">Reinstatement Fee ($250)</Link>
      </div>

      <Link to="/contact" className="block text-gray-600 hover:text-survival-700 font-medium py-2 transition-colors">Contact</Link>
      
      <a 
        href="https://live.vcita.com/site/izk040b42jnjcf3c/activity/dashboard" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-full block"
      >
        <Button className="w-full bg-survival-600 hover:bg-survival-700 text-white">
          <LogIn className="mr-2 h-4 w-4" />
          Customer Portal
        </Button>
      </a>
    </div>
  );
};


import { Link } from "react-router-dom";
import BrandText from "@/components/common/BrandText";

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center">
        <img 
          src="/lovable-uploads/0f83d653-06a8-405a-93ad-63c001f058bc.png" 
          alt="Survival 401k Logo" 
          className="h-20 mr-6" // Increased height from h-16 to h-20 and more right margin
        />
        <div>
          <BrandText className="text-3xl" /> {/* Increased from text-2xl to text-3xl */}
          <p className="text-sm text-gray-500 ml-1">Common Sense Wealth Management</p>
        </div>
      </Link>
    </div>
  );
};

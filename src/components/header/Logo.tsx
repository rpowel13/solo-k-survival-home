
import { Link } from "react-router-dom";
import BrandText from "@/components/common/BrandText";

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center">
        <img 
          src="/lovable-uploads/defe3d28-f928-4eb2-adcf-bfbbd3919d61.png" 
          alt="Survival 401k Logo" 
          className="h-10 mr-2"
        />
        <div>
          <BrandText className="text-2xl" />
          <p className="text-xs text-gray-500 ml-1">Common Sense Wealth Management</p>
        </div>
      </Link>
    </div>
  );
};

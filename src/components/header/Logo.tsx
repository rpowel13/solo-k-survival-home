
import { Link } from "react-router-dom";
import BrandText from "@/components/common/BrandText";

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center">
        <div>
          <BrandText className="text-2xl" />
          <p className="text-xs text-gray-500 ml-1">Common Sense Wealth Management</p>
        </div>
      </Link>
    </div>
  );
};

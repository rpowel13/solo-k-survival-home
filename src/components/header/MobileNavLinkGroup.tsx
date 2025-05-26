
import { ReactNode } from "react";

interface MobileNavLinkGroupProps {
  children: ReactNode;
  className?: string;
}

const MobileNavLinkGroup = ({ children, className = "" }: MobileNavLinkGroupProps) => (
  <div className={`space-y-3 ${className}`}>
    {children}
  </div>
);

export default MobileNavLinkGroup;

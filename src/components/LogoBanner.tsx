
import React from 'react';
import BrandText from "@/components/common/BrandText";
import { cn } from "@/lib/utils";

interface LogoBannerProps {
  className?: string;
}

const LogoBanner: React.FC<LogoBannerProps> = ({ className }) => {
  return (
    <div 
      className={cn(
        "w-full bg-gradient-to-br from-survival-50 to-soft-purple/20 py-8 px-4 text-center",
        "flex flex-col items-center justify-center",
        "border-b border-gray-100 shadow-sm",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <img 
          src="/lovable-uploads/0f83d653-06a8-405a-93ad-63c001f058bc.png" 
          alt="Survival 401k Logo" 
          className="h-24 mb-4 animate-fade-in" 
        />
        <BrandText 
          variant="primary" 
          className="text-4xl md:text-5xl font-bold animate-fade-in"
        />
        <p 
          className="text-xl text-gray-600 max-w-2xl mx-auto text-center animate-fade-in"
        >
          Common Sense Wealth Management
        </p>
      </div>
    </div>
  );
};

export default LogoBanner;

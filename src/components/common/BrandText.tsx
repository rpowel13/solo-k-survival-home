
import React from "react";
import { cn } from "@/lib/utils";

type BrandTextProps = {
  children?: React.ReactNode;
  variant?: "primary" | "inverted" | "monochrome";
  className?: string;
};

const BrandText: React.FC<BrandTextProps> = ({ 
  children, 
  variant = "primary",
  className
}) => {
  if (!children) {
    // Default brand text if none provided
    return renderBrandText("Survival", "401k", variant, className);
  }
  
  return <span className={cn("font-bold", className)}>{children}</span>;
};

/**
 * Helper function to render the brand text with appropriate styling
 */
export const renderBrandText = (
  firstPart: string = "Survival",
  secondPart: string = "401k",
  variant: "primary" | "inverted" | "monochrome" = "primary",
  className?: string
) => {
  const styles = {
    primary: {
      first: "text-survival-800",
      second: "text-finance-600"
    },
    inverted: {
      first: "text-white",
      second: "text-finance-400"
    },
    monochrome: {
      first: "text-gray-900",
      second: "text-gray-900"
    }
  };
  
  const selectedStyle = styles[variant];
  
  return (
    <div className={cn("flex items-center", className)}>
      <span className={cn("font-bold", selectedStyle.first)}>{firstPart}</span>
      <span className={cn("font-bold ml-1", selectedStyle.second)}>{secondPart}</span>
    </div>
  );
};

export default BrandText;

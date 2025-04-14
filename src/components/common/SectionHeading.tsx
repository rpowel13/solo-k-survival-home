
import React from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
  highlightTerm?: string;
  highlightColor?: string;
};

const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  className,
  highlightTerm = "401(k)",
  highlightColor = "text-survival-900 font-bold" // Updated to a darker blue from survival color palette
}) => {
  if (typeof children !== 'string') {
    return <h2 className={className}>{children}</h2>;
  }

  // Support both 401(k) and 401k formats
  const searchTerms = [highlightTerm, highlightTerm.replace("(", "").replace(")", "")];
  let content = children as string;
  
  // Find if any of the search terms are in the content
  const foundTerm = searchTerms.find(term => content.includes(term));
  
  if (!foundTerm) {
    // If no matches, return the original content
    return <h2 className={className}>{children}</h2>;
  }
  
  // Split the content into parts
  const parts = content.split(foundTerm);
  
  return (
    <h2 className={className}>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className={cn(highlightColor, "ml-1")}>{foundTerm}</span>
          )}
        </React.Fragment>
      ))}
    </h2>
  );
};

export default SectionHeading;

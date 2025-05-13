
import { primaryKeywords } from "@/components/SEO";

export const useSEOKeywords = () => {
  // Enhanced SEO keywords combining all requested topics
  const homepageKeywords = `${primaryKeywords.solo401k}, ${primaryKeywords.investments}, self-directed retirement plans, 401k investment options, alternative investments for retirement, precious metals in 401k, real estate investing with 401k, cryptocurrency in 401k, first responder retirement plans, LLC creation for retirement accounts, tax advantages of solo 401k`;
  
  const focusKeywords = [
    // Solo 401k keywords
    "Solo 401k for self-employed",
    "Self-directed retirement plans",
    "401k investment options",
    "Alternative investments for retirement",
    "Precious metals in 401k",
    "Real estate investing with 401k",
    "Cryptocurrency in 401k",
    "First responder retirement plans",
    "LLC creation for retirement accounts",
    "Tax advantages of solo 401k",
    "Checkbook control retirement",
    "High contribution retirement plans"
  ];
  
  return {
    homepageKeywords,
    focusKeywords
  };
};

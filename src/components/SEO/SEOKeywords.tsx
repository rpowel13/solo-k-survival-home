
import React from 'react';

// Define keyword categories for better organization
export interface KeywordCategory {
  category: string;
  keywords: string[];
}

// Exported keyword collections for reuse across pages
export const primaryKeywords = {
  solo401k: "solo 401k, self-employed retirement, individual 401k, small business 401k, retirement planning",
  investments: "alternative investments, self-directed retirement, retirement portfolio diversification, investment options",
  realEstate: "real estate investing, property in 401k, rental income retirement, real estate retirement strategy",
  preciousMetals: "gold in 401k, silver investing, precious metals retirement, inflation protection",
  cryptocurrency: "crypto retirement, bitcoin in 401k, cryptocurrency investments, digital assets",
  firstResponder: "first responder retirement, police retirement plans, firefighter benefits, EMT retirement options",
  llcServices: "llc creation, business formation, asset protection, pass-through taxation",
  taxBenefits: "tax advantages retirement, tax-deferred growth, retirement tax strategies, tax planning"
};

// Categorized keywords for thematic organization
export const keywordCategories: KeywordCategory[] = [
  {
    category: "Solo 401k",
    keywords: [
      "Solo 401k for self-employed",
      "Self-employed retirement plans",
      "Individual 401k plans",
      "Small business retirement",
      "High contribution limits",
      "Checkbook control retirement"
    ]
  },
  {
    category: "Investment Options",
    keywords: [
      "Self-directed retirement plans",
      "401k investment options",
      "Alternative investments for retirement",
      "Retirement portfolio diversification",
      "Non-traditional retirement assets",
      "Investment flexibility"
    ]
  },
  {
    category: "Alternative Assets",
    keywords: [
      "Precious metals in 401k",
      "Real estate investing with 401k",
      "Cryptocurrency in 401k",
      "Private lending retirement",
      "Tax liens in retirement accounts",
      "Private equity retirement"
    ]
  },
  {
    category: "Special Programs",
    keywords: [
      "First responder retirement plans",
      "LLC creation for retirement accounts",
      "Business structures for retirement",
      "Vehicle purchase through business"
    ]
  },
  {
    category: "Tax Benefits",
    keywords: [
      "Tax advantages of solo 401k",
      "Tax-deferred retirement growth",
      "Roth solo 401k options",
      "Tax strategies for retirement",
      "Retirement tax planning"
    ]
  }
];

// Function to get relevant keywords for a specific page
export const getRelevantKeywords = (categories: string[]): string[] => {
  let result: string[] = [];
  
  categories.forEach(category => {
    const matchingCategory = keywordCategories.find(cat => 
      cat.category.toLowerCase() === category.toLowerCase());
    
    if (matchingCategory) {
      result = [...result, ...matchingCategory.keywords];
    }
  });
  
  return result;
};

// Function to create comma-separated keyword string
export const createKeywordString = (keywords: string[]): string => {
  return keywords.join(', ');
};

// Combine primary keyword strings with additional keywords
export const combineKeywords = (primaryKeywordString: string, additionalKeywords: string[]): string => {
  if (!additionalKeywords.length) return primaryKeywordString;
  return `${primaryKeywordString}, ${additionalKeywords.join(', ')}`;
};

const SEOKeywords = () => {
  // This is a utility component, it doesn't render anything
  return null;
};

export default SEOKeywords;

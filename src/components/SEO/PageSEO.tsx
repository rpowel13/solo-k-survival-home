
import React from 'react';
import { Helmet } from 'react-helmet-async';
import SiteMetadata from './SiteMetadata';
import { getRelevantKeywords, combineKeywords } from './SEOKeywords';

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath: string; // Path without domain
  imageUrl?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  structuredData?: Record<string, any>[];
  focusKeywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  keywordCategories?: string[]; // New prop for keyword categories
}

const PageSEO: React.FC<PageSEOProps> = ({
  title,
  description,
  keywords,
  canonicalPath,
  imageUrl,
  type = 'website',
  noindex = false,
  structuredData = [],
  focusKeywords = [],
  author,
  publishedTime,
  modifiedTime,
  keywordCategories = [], // Default to empty array
}) => {
  // Combine title with site name for consistency
  const fullTitle = `${title} | Survival 401k`;
  
  // Get additional keywords from categories if specified
  const categoryKeywords = keywordCategories.length > 0 
    ? getRelevantKeywords(keywordCategories) 
    : [];
  
  // Combine all keyword sources
  const allFocusKeywords = [...focusKeywords, ...categoryKeywords];
  
  // Enhanced keywords with focus keywords if provided
  const enhancedKeywords = allFocusKeywords.length > 0 && keywords 
    ? `${keywords}, ${allFocusKeywords.join(', ')}`
    : allFocusKeywords.length > 0 
      ? allFocusKeywords.join(', ')
      : keywords;

  return (
    <SiteMetadata
      title={fullTitle}
      description={description}
      keywords={enhancedKeywords}
      canonicalPath={canonicalPath}
      imageUrl={imageUrl}
      type={type}
      structuredData={structuredData}
      noindex={noindex}
      focusKeywords={allFocusKeywords}
      author={author}
      publishedTime={publishedTime}
      modifiedTime={modifiedTime}
    />
  );
};

export default PageSEO;

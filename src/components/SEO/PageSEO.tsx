
import React from 'react';
import { Helmet } from 'react-helmet-async';
import SiteMetadata from './SiteMetadata';

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath: string; // Path without domain
  imageUrl?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  structuredData?: Record<string, any>[];
  focusKeywords?: string[]; // Added focus keywords array
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
  focusKeywords = [], // Default to empty array
}) => {
  // Combine title with site name for consistency
  const fullTitle = `${title} | Survival 401k`;
  
  // Enhanced keywords with focus keywords if provided
  const enhancedKeywords = focusKeywords.length > 0 
    ? `${keywords || ''}, ${focusKeywords.join(', ')}`
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
      focusKeywords={focusKeywords}
    />
  );
};

export default PageSEO;


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
}) => {
  // Combine title with site name for consistency
  const fullTitle = `${title} | Survival 401k`;

  return (
    <SiteMetadata
      title={fullTitle}
      description={description}
      keywords={keywords}
      canonicalPath={canonicalPath}
      imageUrl={imageUrl}
      type={type}
      structuredData={structuredData}
      noindex={noindex}
    />
  );
};

export default PageSEO;

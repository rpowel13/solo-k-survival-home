
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SiteMetadataProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string; // Path only, without domain
  imageUrl?: string;
  type?: 'website' | 'article';
  structuredData?: Record<string, any>[];
  noindex?: boolean;
  focusKeywords?: string[];
}

const SiteMetadata: React.FC<SiteMetadataProps> = ({
  title,
  description,
  keywords = '',
  canonicalPath = '/',
  imageUrl = '/lovable-uploads/0f83d653-06a8-405a-93ad-63c001f058bc.png',
  type = 'website',
  structuredData = [],
  noindex = false,
  focusKeywords = [],
}) => {
  const siteUrl = 'https://survival401k.com';
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const imageFullUrl = imageUrl.startsWith('http') ? imageUrl : `${siteUrl}${imageUrl}`;

  // Minimize SEO markup to essential elements only
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots control */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageFullUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageFullUrl} />
      
      {/* Focus Keywords - only include if provided */}
      {focusKeywords.length > 0 && (
        <meta name="focus-keywords" content={focusKeywords.join(', ')} />
      )}
      
      {/* Structured Data - only include if provided */}
      {structuredData.length > 0 && structuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SiteMetadata;

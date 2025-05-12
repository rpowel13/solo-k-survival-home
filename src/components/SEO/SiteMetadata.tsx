
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
  focusKeywords?: string[]; // Added focus keywords array
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
  focusKeywords = [], // Default to empty array
}) => {
  const siteUrl = 'https://survival401k.com';
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const imageFullUrl = imageUrl.startsWith('http') ? imageUrl : `${siteUrl}${imageUrl}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots control */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

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
      
      {/* Focus Keywords in meta description for better SEO */}
      {focusKeywords.length > 0 && (
        <>
          <meta name="focus-keywords" content={focusKeywords.join(', ')} />
          {/* Schema.org keywords markup */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "keywords": focusKeywords.join(', ')
            })}
          </script>
        </>
      )}
      
      {/* Structured Data */}
      {structuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SiteMetadata;

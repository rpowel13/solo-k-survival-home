
import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface Breadcrumb {
  name: string;
  url: string;
  position: number;
}

interface BreadcrumbSchemaProps {
  breadcrumbs: Breadcrumb[];
  baseUrl?: string;
}

const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ 
  breadcrumbs, 
  baseUrl = 'https://survival401k.com' 
}) => {
  // Ensure URLs are absolute
  const itemListElement = breadcrumbs.map(crumb => ({
    "@type": "ListItem",
    "position": crumb.position,
    "name": crumb.name,
    "item": crumb.url.startsWith('http') ? crumb.url : `${baseUrl}${crumb.url}`
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default BreadcrumbSchema;

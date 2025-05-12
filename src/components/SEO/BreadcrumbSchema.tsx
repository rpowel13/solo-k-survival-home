
import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface Breadcrumb {
  name: string;
  item: string;
  position: number;
}

interface BreadcrumbSchemaProps {
  breadcrumbs: Breadcrumb[];
}

/**
 * Generates schema.org BreadcrumbList structured data for SEO
 */
const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ breadcrumbs }) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map(crumb => ({
      "@type": "ListItem",
      "position": crumb.position,
      "name": crumb.name,
      "item": crumb.item
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default BreadcrumbSchema;

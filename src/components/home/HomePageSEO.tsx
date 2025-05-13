
import React from 'react';
import { PageSEO } from "@/components/SEO";

interface HomePageSEOProps {
  homepageKeywords: string;
  focusKeywords: string[];
  structuredData: Record<string, any>[];
}

const HomePageSEO: React.FC<HomePageSEOProps> = React.memo(({
  homepageKeywords,
  focusKeywords,
  structuredData
}) => {
  return (
    <PageSEO
      title="Solo 401k Plans for Self-Employed Professionals"
      description="Expert Solo 401k plans and retirement solutions with alternative investment options including real estate, precious metals, and cryptocurrency for entrepreneurs, First Responders, and self-employed professionals."
      keywords={homepageKeywords}
      canonicalPath="/"
      type="website"
      structuredData={structuredData}
      focusKeywords={focusKeywords}
      keywordCategories={["Solo 401k", "Investment Options", "Alternative Assets", "Special Programs", "Tax Benefits"]}
    />
  );
});

HomePageSEO.displayName = 'HomePageSEO';

export default HomePageSEO;

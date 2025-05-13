
import React from 'react';

export interface HomeStructuredDataProps {
  focusKeywords: string[];
}

const HomeStructuredData = ({ 
  focusKeywords 
}: HomeStructuredDataProps): { structuredData: Record<string, any>[] } => {
  // Structured data for homepage with enhanced keywords
  const structuredData = [
    // Local Business Schema
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Survival 401k",
      "url": "https://survival401k.com/",
      "logo": "https://survival401k.com/lovable-uploads/0f83d653-06a8-405a-93ad-63c001f058bc.png",
      "description": "Expert Solo 401k plans and retirement solutions for entrepreneurs, First Responders, and self-employed professionals.",
      "telephone": "+18332245517",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      },
      "keywords": focusKeywords.join(', '),
      "sameAs": [
        "https://www.facebook.com/survival401k",
        "https://twitter.com/survival401k",
        "https://www.linkedin.com/company/survival401k"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "401k Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Solo 401k Plans",
              "description": "Customized retirement plans for self-employed individuals."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "LLC Creation",
              "description": "Business formation services for entrepreneurs."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "First Responder Package",
              "description": "Specialized retirement solutions for first responders."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Alternative Investment Options",
              "description": "Self-directed investments including real estate, precious metals, and cryptocurrency."
            }
          }
        ]
      }
    },
    // FAQ Schema
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a Solo 401k?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Solo 401k is a tax-advantaged retirement plan specifically designed for self-employed individuals and small business owners with no full-time employees other than themselves and possibly a spouse."
          }
        },
        {
          "@type": "Question",
          "name": "Who qualifies for a Solo 401k?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To qualify for a Solo 401k, you must have self-employment income (full-time or part-time), have no full-time employees other than yourself and your spouse, and generate self-employment income through a sole proprietorship, LLC, partnership, or corporation."
          }
        },
        {
          "@type": "Question",
          "name": "What are the benefits of a Solo 401k?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Solo 401ks offer high contribution limits, tax advantages with both traditional and Roth options, investment flexibility, potential for loans, asset protection, and simplified administration compared to other retirement plans."
          }
        },
        {
          "@type": "Question",
          "name": "Can I invest in alternative assets with a Solo 401k?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, one of the key advantages of a self-directed Solo 401k is the ability to invest in alternative assets like real estate, precious metals, private lending, tax liens, and more beyond traditional stocks and mutual funds."
          }
        },
        {
          "@type": "Question",
          "name": "Can I invest in cryptocurrency with my Solo 401k?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, with a self-directed Solo 401k, you can invest in cryptocurrency and other digital assets as part of your retirement portfolio diversification strategy."
          }
        },
        {
          "@type": "Question",
          "name": "Are there special retirement plans for first responders?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we offer specialized retirement planning services for first responders that take into account their unique career circumstances, pension options, and retirement needs."
          }
        }
      ]
    },
    // Breadcrumb Schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://survival401k.com/"
        }
      ]
    }
  ];
  
  return { structuredData };
};

export default HomeStructuredData;

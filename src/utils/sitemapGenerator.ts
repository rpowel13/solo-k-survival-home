
import fs from 'fs';
import path from 'path';

interface SitemapImage {
  loc: string;
  title?: string;
  caption?: string;
  geoLocation?: string;
  license?: string;
}

interface SitemapURL {
  url: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  lastmod?: string;
  keywords?: string[]; // Added keywords for better SEO
  images?: SitemapImage[]; // Support for image sitemaps
  alternateLanguages?: {code: string, url: string}[]; // For multilingual sites
  news?: {
    publication: string;
    publicationDate: string;
    title: string;
    keywords?: string;
  }; // For news articles
}

const generateSitemapXML = (urls: SitemapURL[]): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
  xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.url}</loc>\n`;
    if (url.lastmod) {
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    }
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
    
    // Add alternate language versions if available
    if (url.alternateLanguages && url.alternateLanguages.length > 0) {
      url.alternateLanguages.forEach(alt => {
        xml += `    <xhtml:link rel="alternate" hreflang="${alt.code}" href="${alt.url}" />\n`;
      });
    }
    
    // Add news-specific data if this is a news article
    if (url.news) {
      xml += '    <news:news>\n';
      xml += '      <news:publication>\n';
      xml += `        <news:name>${url.news.publication}</news:name>\n`;
      xml += '        <news:language>en</news:language>\n';
      xml += '      </news:publication>\n';
      xml += `      <news:publication_date>${url.news.publicationDate}</news:publication_date>\n`;
      xml += `      <news:title>${url.news.title}</news:title>\n`;
      if (url.news.keywords) {
        xml += `      <news:keywords>${url.news.keywords}</news:keywords>\n`;
      }
      xml += '    </news:news>\n';
    }
    
    // Add images if available
    if (url.images && url.images.length > 0) {
      url.images.forEach(image => {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${image.loc}</image:loc>\n`;
        if (image.title) {
          xml += `      <image:title>${image.title}</image:title>\n`;
        }
        if (image.caption) {
          xml += `      <image:caption>${image.caption}</image:caption>\n`;
        }
        if (image.geoLocation) {
          xml += `      <image:geo_location>${image.geoLocation}</image:geo_location>\n`;
        }
        if (image.license) {
          xml += `      <image:license>${image.license}</image:license>\n`;
        }
        xml += '    </image:image>\n';
      });
    }
    
    // Add keyword hints in XML comments
    if (url.keywords && url.keywords.length > 0) {
      xml += `    <!-- Keywords: ${url.keywords.join(', ')} -->\n`;
    }
    
    xml += '  </url>\n';
  });
  
  xml += '</urlset>\n';
  return xml;
};

export const generateSitemap = async (baseUrl: string, outputPath: string): Promise<void> => {
  const today = new Date().toISOString().split('T')[0];
  
  const urls: SitemapURL[] = [
    { 
      url: `${baseUrl}/`, 
      changefreq: 'weekly', 
      priority: 1.0, 
      lastmod: today,
      keywords: ['solo 401k', 'self employed retirement', 'retirement planning', 'small business 401k'],
      images: [
        {
          loc: `${baseUrl}/lovable-uploads/0f83d653-06a8-405a-93ad-63c001f058bc.png`,
          title: 'Survival 401k Logo'
        }
      ]
    },
    { 
      url: `${baseUrl}/services/solo-401k`, 
      changefreq: 'weekly', 
      priority: 0.9, 
      lastmod: today,
      keywords: ['solo 401k plans', 'individual 401k', 'self employed retirement plans', 'high contribution retirement'] 
    },
    { 
      url: `${baseUrl}/services/llc-creation`, 
      changefreq: 'weekly', 
      priority: 0.8, 
      lastmod: today,
      keywords: ['llc formation', 'business structure', 'asset protection', 'pass through taxation'] 
    },
    { 
      url: `${baseUrl}/services/first-responder-package`, 
      changefreq: 'weekly', 
      priority: 0.8, 
      lastmod: today,
      keywords: ['first responder retirement', 'police retirement plans', 'firefighter 401k', 'EMT retirement benefits'] 
    },
    { 
      url: `${baseUrl}/services/alternative-investments`, 
      changefreq: 'weekly', 
      priority: 0.8, 
      lastmod: today,
      keywords: ['alternative investments', 'real estate investing', 'precious metals', 'private equity', 'cryptocurrency retirement'] 
    },
    { 
      url: `${baseUrl}/services/metal-prices`, 
      changefreq: 'weekly', 
      priority: 0.8, 
      lastmod: today,
      keywords: ['gold prices', 'silver investing', 'precious metals ira', 'metals in 401k', 'inflation protection'] 
    },
    { 
      url: `${baseUrl}/apply/solo-401k`, 
      changefreq: 'weekly', 
      priority: 0.7, 
      lastmod: today,
      keywords: ['apply for solo 401k', '401k application', 'retirement plan setup'] 
    },
    { 
      url: `${baseUrl}/apply/llc`, 
      changefreq: 'weekly', 
      priority: 0.7, 
      lastmod: today,
      keywords: ['llc application', 'form llc online', 'business formation'] 
    },
    { 
      url: `${baseUrl}/apply/first-responder`, 
      changefreq: 'weekly', 
      priority: 0.7, 
      lastmod: today,
      keywords: ['first responder benefits', 'special retirement packages', 'first responder financial planning'] 
    },
    { 
      url: `${baseUrl}/tools/retirement-calculator`, 
      changefreq: 'monthly', 
      priority: 0.6, 
      lastmod: today,
      keywords: ['retirement calculator', 'retirement savings projection', 'retirement planning tools'],
      images: [
        {
          loc: `${baseUrl}/lovable-uploads/0f83d653-06a8-405a-93ad-63c001f058bc.png`,
          title: 'Retirement Calculator Tool'
        }
      ]
    },
    { 
      url: `${baseUrl}/tools/loan-calculator`, 
      changefreq: 'monthly', 
      priority: 0.6, 
      lastmod: today,
      keywords: ['401k loan calculator', 'retirement loan', 'borrow from 401k'] 
    },
    { 
      url: `${baseUrl}/tools/rmd-calculator`, 
      changefreq: 'monthly', 
      priority: 0.6, 
      lastmod: today,
      keywords: ['required minimum distribution', 'rmd calculation', '401k withdrawals'] 
    },
    { 
      url: `${baseUrl}/tools/solo-401k-calculator`, 
      changefreq: 'monthly', 
      priority: 0.6, 
      lastmod: today,
      keywords: ['solo 401k contribution calculator', 'self employed contribution limits', 'maximum 401k contributions'] 
    },
    { 
      url: `${baseUrl}/contact`, 
      changefreq: 'monthly', 
      priority: 0.7, 
      lastmod: today,
      keywords: ['contact retirement specialist', 'financial advisor consultation', '401k expert help'] 
    },
    { 
      url: `${baseUrl}/terms-of-service`, 
      changefreq: 'yearly', 
      priority: 0.3, 
      lastmod: today 
    },
    { 
      url: `${baseUrl}/privacy-policy`, 
      changefreq: 'yearly', 
      priority: 0.3, 
      lastmod: today 
    },
    { 
      url: `${baseUrl}/legal-disclosures`, 
      changefreq: 'yearly', 
      priority: 0.3, 
      lastmod: today 
    },
  ];
  
  const xml = generateSitemapXML(urls);
  
  try {
    fs.writeFileSync(path.resolve(outputPath), xml);
    console.log(`Sitemap generated at ${outputPath}`);
  } catch (error) {
    console.error('Error writing sitemap file:', error);
  }
};

// Function to generate the sitemap on build/deployment
export const generateSitemapOnDeploy = () => {
  const baseUrl = 'https://survival401k.com';
  const outputPath = './public/sitemap.xml';
  generateSitemap(baseUrl, outputPath);
};

export default generateSitemap;

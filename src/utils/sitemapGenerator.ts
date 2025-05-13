
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
  video?: {
    title: string;
    description: string;
    thumbnailLoc: string;
    contentLoc: string;
    duration?: number;
  }; // Added support for video sitemaps
}

const generateSitemapXML = (urls: SitemapURL[]): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
  xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';
  
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
    
    // Add video if available
    if (url.video) {
      xml += '    <video:video>\n';
      xml += `      <video:title>${url.video.title}</video:title>\n`;
      xml += `      <video:description>${url.video.description}</video:description>\n`;
      xml += `      <video:thumbnail_loc>${url.video.thumbnailLoc}</video:thumbnail_loc>\n`;
      xml += `      <video:content_loc>${url.video.contentLoc}</video:content_loc>\n`;
      if (url.video.duration) {
        xml += `      <video:duration>${url.video.duration}</video:duration>\n`;
      }
      xml += '    </video:video>\n';
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
      keywords: ['solo 401k', 'self employed retirement', 'retirement planning', 'small business 401k', 'retirement tax advantages'],
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
      keywords: ['solo 401k plans', 'individual 401k', 'self employed retirement plans', 'high contribution retirement', 'tax advantaged retirement'] 
    },
    { 
      url: `${baseUrl}/services/llc-creation`, 
      changefreq: 'weekly', 
      priority: 0.8, 
      lastmod: today,
      keywords: ['llc formation', 'business structure', 'asset protection', 'pass through taxation', 'small business formation'] 
    },
    { 
      url: `${baseUrl}/services/first-responder-package`, 
      changefreq: 'weekly', 
      priority: 0.8, 
      lastmod: today,
      keywords: ['first responder retirement', 'police retirement plans', 'firefighter 401k', 'EMT retirement benefits', 'special retirement packages'] 
    },
    { 
      url: `${baseUrl}/services/alternative-investments`, 
      changefreq: 'weekly', 
      priority: 0.8, 
      lastmod: today,
      keywords: ['alternative investments', 'real estate investing', 'precious metals', 'private equity', 'cryptocurrency retirement', 'self-directed investing'] 
    },
    { 
      url: `${baseUrl}/services/metal-prices`, 
      changefreq: 'weekly', 
      priority: 0.8, 
      lastmod: today,
      keywords: ['gold prices', 'silver investing', 'precious metals ira', 'metals in 401k', 'inflation protection', 'gold investment'] 
    },
    { 
      url: `${baseUrl}/apply/solo-401k`, 
      changefreq: 'weekly', 
      priority: 0.7, 
      lastmod: today,
      keywords: ['apply for solo 401k', '401k application', 'retirement plan setup', 'start solo 401k'] 
    },
    { 
      url: `${baseUrl}/apply/llc`, 
      changefreq: 'weekly', 
      priority: 0.7, 
      lastmod: today,
      keywords: ['llc application', 'form llc online', 'business formation', 'start an llc'] 
    },
    { 
      url: `${baseUrl}/apply/first-responder`, 
      changefreq: 'weekly', 
      priority: 0.7, 
      lastmod: today,
      keywords: ['first responder benefits', 'special retirement packages', 'first responder financial planning', 'police retirement plans'] 
    },
    { 
      url: `${baseUrl}/tools/retirement-calculator`, 
      changefreq: 'monthly', 
      priority: 0.6, 
      lastmod: today,
      keywords: ['retirement calculator', 'retirement savings projection', 'retirement planning tools', 'savings calculator'],
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
      keywords: ['401k loan calculator', 'retirement loan', 'borrow from 401k', 'retirement plan loans'] 
    },
    { 
      url: `${baseUrl}/tools/rmd-calculator`, 
      changefreq: 'monthly', 
      priority: 0.6, 
      lastmod: today,
      keywords: ['required minimum distribution', 'rmd calculation', '401k withdrawals', 'retirement distributions'] 
    },
    { 
      url: `${baseUrl}/tools/solo-401k-calculator`, 
      changefreq: 'monthly', 
      priority: 0.6, 
      lastmod: today,
      keywords: ['solo 401k contribution calculator', 'self employed contribution limits', 'maximum 401k contributions', 'retirement contribution calculator'] 
    },
    { 
      url: `${baseUrl}/contact`, 
      changefreq: 'monthly', 
      priority: 0.7, 
      lastmod: today,
      keywords: ['contact retirement specialist', 'financial advisor consultation', '401k expert help', 'retirement planning consultation'] 
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
    console.log(`Sitemap generated at ${outputPath} with ${urls.length} URLs`);
    
    // Generate sitemap index if needed for larger sites
    if (urls.length > 50) {
      generateSitemapIndex(baseUrl, outputPath);
    }
  } catch (error) {
    console.error('Error writing sitemap file:', error);
  }
};

// Function to generate a sitemap index for larger sites
const generateSitemapIndex = (baseUrl: string, mainSitemapPath: string) => {
  const today = new Date().toISOString().split('T')[0];
  const filename = path.basename(mainSitemapPath);
  const directory = path.dirname(mainSitemapPath);
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  xml += '  <sitemap>\n';
  xml += `    <loc>${baseUrl}/${filename}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += '  </sitemap>\n';
  xml += '</sitemapindex>\n';
  
  try {
    fs.writeFileSync(path.resolve(directory, 'sitemap-index.xml'), xml);
    console.log(`Sitemap index generated at ${directory}/sitemap-index.xml`);
  } catch (error) {
    console.error('Error writing sitemap index file:', error);
  }
};

// Function to generate the sitemap on build/deployment
export const generateSitemapOnDeploy = () => {
  const baseUrl = 'https://survival401k.com';
  const outputPath = './public/sitemap.xml';
  generateSitemap(baseUrl, outputPath);
};

// Function to ping search engines about the updated sitemap
export const notifySearchEngines = async (sitemapUrl: string): Promise<void> => {
  const searchEngines = [
    `https://www.google.com/ping?sitemap=${sitemapUrl}`,
    `https://www.bing.com/ping?sitemap=${sitemapUrl}`
  ];
  
  try {
    // Use Promise.all to ping all search engines simultaneously
    await Promise.all(searchEngines.map(async (engineUrl) => {
      try {
        const response = await fetch(engineUrl);
        console.log(`Notified ${engineUrl.split('?')[0]} - Status: ${response.status}`);
        return response;
      } catch (error) {
        console.error(`Failed to notify ${engineUrl.split('?')[0]}:`, error);
        return null;
      }
    }));
    
    console.log('Search engine notification complete');
  } catch (error) {
    console.error('Error notifying search engines:', error);
  }
};

export default generateSitemap;

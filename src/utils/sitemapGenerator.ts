
import fs from 'fs';
import path from 'path';

interface SitemapURL {
  url: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  lastmod?: string;
}

const generateSitemapXML = (urls: SitemapURL[]): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.url}</loc>\n`;
    if (url.lastmod) {
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    }
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>\n';
  return xml;
};

export const generateSitemap = async (baseUrl: string, outputPath: string): Promise<void> => {
  const today = new Date().toISOString().split('T')[0];
  
  const urls: SitemapURL[] = [
    { url: `${baseUrl}/`, changefreq: 'weekly', priority: 1.0, lastmod: today },
    { url: `${baseUrl}/services/solo-401k`, changefreq: 'weekly', priority: 0.9, lastmod: today },
    { url: `${baseUrl}/services/llc-creation`, changefreq: 'weekly', priority: 0.8, lastmod: today },
    { url: `${baseUrl}/services/first-responder-package`, changefreq: 'weekly', priority: 0.8, lastmod: today },
    { url: `${baseUrl}/services/alternative-investments`, changefreq: 'weekly', priority: 0.8, lastmod: today },
    { url: `${baseUrl}/services/metal-prices`, changefreq: 'weekly', priority: 0.8, lastmod: today },
    { url: `${baseUrl}/apply/solo-401k`, changefreq: 'weekly', priority: 0.7, lastmod: today },
    { url: `${baseUrl}/apply/llc`, changefreq: 'weekly', priority: 0.7, lastmod: today },
    { url: `${baseUrl}/apply/first-responder`, changefreq: 'weekly', priority: 0.7, lastmod: today },
    { url: `${baseUrl}/tools/retirement-calculator`, changefreq: 'monthly', priority: 0.6, lastmod: today },
    { url: `${baseUrl}/tools/loan-calculator`, changefreq: 'monthly', priority: 0.6, lastmod: today },
    { url: `${baseUrl}/tools/rmd-calculator`, changefreq: 'monthly', priority: 0.6, lastmod: today },
    { url: `${baseUrl}/tools/solo-401k-calculator`, changefreq: 'monthly', priority: 0.6, lastmod: today },
    { url: `${baseUrl}/contact`, changefreq: 'monthly', priority: 0.7, lastmod: today },
    { url: `${baseUrl}/terms-of-service`, changefreq: 'yearly', priority: 0.3, lastmod: today },
    { url: `${baseUrl}/privacy-policy`, changefreq: 'yearly', priority: 0.3, lastmod: today },
    { url: `${baseUrl}/legal-disclosures`, changefreq: 'yearly', priority: 0.3, lastmod: today },
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

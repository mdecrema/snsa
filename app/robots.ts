// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Proteggi le rotte di amministrazione
    },
    sitemap: 'https://www.swissnaturalskincare.ch/sitemap.xml',
  };
}
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { db } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.swissnaturalskincare.ch';

  // Recupera i link dinamici dal database (es. news o report)
  const news = await db.event.findMany({ select: { title: true, updatedAt: true } });

  const newsUrls = news.map((item) => ({
    url: `${baseUrl}/events/${item.title}`,
    lastModified: item.updatedAt,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...newsUrls,
  ];
}
// lib/analytics.ts
import { db } from '@/lib/db';

export async function logAnalyticsEvent(type: string, path?: string, metadata?: Record<string, unknown>) {
  try {
    await db.analyticsEvent.create({
      data: {
        type,
        path,
        metadata: metadata ? JSON.stringify(metadata) : undefined,
      },
    });
  } catch (error) {
    console.error('Failed to log analytics event:', error);
  }
}
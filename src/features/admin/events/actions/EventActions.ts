'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createEvent(formData: {
  title: string;
  dateRange: string;
  location: string;
  accreditationText?: string;
  description: string;
  topic: string;
  month: string;
  year: string;
  logoUrl?: string;
  isFeatured: boolean;
}) {
  await db.event.create({
    data: formData,
  });

  revalidatePath('/admin/dashboard/events');
  revalidatePath('/events');
  revalidatePath('/'); // Revalidate homepage for featured events
}

export async function deleteEvent(id: string) {
  await db.event.delete({
    where: { id },
  });

  revalidatePath('/admin/dashboard/events');
  revalidatePath('/events');
  revalidatePath('/');
}

export async function toggleFeaturedEvent(id: string, currentStatus: boolean) {
  await db.event.update({
    where: { id },
    data: { isFeatured: !currentStatus },
  });

  revalidatePath('/admin/dashboard/events');
  revalidatePath('/events');
  revalidatePath('/');
}
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateNavItemAction(
  id: number,
  data: {
    title: Record<string, string>;
    subtitle: Record<string, string>;
    description: Record<string, string>;
    image?: string;
    href: string;
  }
) {
  try {
    await db.navItem.update({
      where: { id },
      data: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        image: data.image,
        href: data.href,
      },
    });

    revalidatePath('/', 'layout'); // Clears cache so public site reflects edits instantly
    return { success: true };
  } catch (error) {
    console.error('Failed to update NavItem:', error);
    return { success: false, error: 'Failed to update page data' };
  }
}
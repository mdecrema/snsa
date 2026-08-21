'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

function getFormField(formData: FormData, key: string): string {
  const directValue = formData.get(key);
  if (directValue) return directValue as string;

  for (const [fieldName, value] of formData.entries()) {
    if (fieldName.endsWith(`_${key}`) || fieldName === key) {
      return value as string;
    }
  }
  return '';
}

export async function createMemberAction(formData: FormData) {
  const name = getFormField(formData, 'name');
  const location = getFormField(formData, 'location');
  const description = getFormField(formData, 'description');
  const website = getFormField(formData, 'website');
  const certifiedSinceStr = getFormField(formData, 'certifiedSince');
  const imageUrl = getFormField(formData, 'imageUrl');
  const categoryIdStr = getFormField(formData, 'categoryId');
  const publishedStr = getFormField(formData, 'published');

  if (!name || !location || !description || !website || !certifiedSinceStr || !categoryIdStr) {
    return { error: 'Please fill in all required fields.' };
  }

  try {
    await db.member.create({
      data: {
        name,
        location,
        description,
        website,
        certifiedSince: parseInt(certifiedSinceStr, 10),
        imageUrl: imageUrl || null,
        categoryId: parseInt(categoryIdStr, 10),
        published: publishedStr === 'true',
      },
    });

    revalidatePath('/admin/members');
    return { success: true };
  } catch (err: any) {
    console.error('Create Member Error:', err);
    return { error: err?.message || 'Failed to create member.' };
  }
}

export async function updateMemberAction(id: number, formData: FormData) {
  const name = getFormField(formData, 'name');
  const location = getFormField(formData, 'location');
  const description = getFormField(formData, 'description');
  const website = getFormField(formData, 'website');
  const certifiedSinceStr = getFormField(formData, 'certifiedSince');
  const imageUrl = getFormField(formData, 'imageUrl');
  const categoryIdStr = getFormField(formData, 'categoryId');
  const publishedStr = getFormField(formData, 'published');

  if (!name || !location || !description || !website || !certifiedSinceStr || !categoryIdStr) {
    return { error: 'Please fill in all required fields.' };
  }

  try {
    await db.member.update({
      where: { id },
      data: {
        name,
        location,
        description,
        website,
        certifiedSince: parseInt(certifiedSinceStr, 10),
        imageUrl: imageUrl || null,
        categoryId: parseInt(categoryIdStr, 10),
        published: publishedStr === 'true',
      },
    });

    revalidatePath('/admin/members');
    return { success: true };
  } catch (err: any) {
    return { error: err?.message || 'Failed to update member.' };
  }
}
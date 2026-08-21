'use server';

import { Role } from '@/app/generated/prisma';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
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

export async function createUserAction(formData: FormData) {
  const firstName = getFormField(formData, 'firstName');
  const lastName = getFormField(formData, 'lastName');
  const email = getFormField(formData, 'email');
  const roleString = getFormField(formData, 'role');
  const password = getFormField(formData, 'password');

  if (!firstName || !lastName || !email || !roleString || !password) {
    return { error: 'All fields are required.' };
  }

  try {
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return { error: 'A user with this email already exists.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        role: roleString as Role,
        password: hashedPassword,
      },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (err: any) {
    console.error('Create User Error:', err);
    return { error: err?.message || 'Failed to create user.' };
  }
}

export async function updateUserAction(id: string, formData: FormData) {
  const firstName = getFormField(formData, 'firstName');
  const lastName = getFormField(formData, 'lastName');
  const email = getFormField(formData, 'email');
  const roleString = getFormField(formData, 'role');
  const password = getFormField(formData, 'password');

  if (!firstName || !lastName || !email || !roleString) {
    return { error: 'First name, last name, email, and role are required.' };
  }

  try {
    const updateData: any = {
      firstName,
      lastName,
      email,
      role: roleString as Role,
    };

    if (password && password.trim().length > 0) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await db.user.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (err: any) {
    return { error: err?.message || 'Failed to update user.' };
  }
}
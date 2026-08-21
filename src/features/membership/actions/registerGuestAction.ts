'use server';

import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function registerGuestAction(prevState: any, formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const country = formData.get('country') as string;

  // Validate all mandatory fields
  if (!firstName || !lastName || !email || !password || !address || !city || !country) {
    return { error: 'All fields are mandatory.' };
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters long.' };
  }

  try {
    const existingGuest = await db.guest.findUnique({ where: { email } });
    if (existingGuest) {
      return { error: 'This email address is already registered.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.guest.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        address,
        city,
        country,
      },
    });

    return { success: true };
  } catch (err) {
    return { error: 'An error occurred during registration. Please try again.' };
  }
}
'use server';

import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please enter both email and password.' };
  }

  try {
    // 1. Find user in PostgreSQL
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: 'Invalid email or password.' };
    }

    // 2. Compare entered password with stored hash
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return { error: 'Invalid email or password.' };
    }

    const redirectUrl = user.role === 'ADMIN' ? '/dashboard' : '/';

    // 3. Authenticate User (e.g. set a cookie or JWT)
    // For now, return success & basic user data (excluding password)
    return {
        success: true,
        redirectTo: redirectUrl
    };
  } catch (err) {
    return { error: 'Something went wrong. Please try again.' };
  }
}
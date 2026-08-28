'use server';

import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

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

    // 3. Set Secure Cookie for Authentication
    const cookieStore = await cookies();
    
    // In production, sign/encrypt this payload (e.g., using `jose` or `jsonwebtoken`)
    const tokenPayload = JSON.stringify({ userId: user.id, role: user.role });

    cookieStore.set('auth_token', tokenPayload, {
      httpOnly: true, // Prevents XSS attacks (client-side JS can't read it)
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax', // Protects against CSRF
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week duration
    });

    const redirectUrl = user.role === 'ADMIN' ? '/dashboard' : '/';

    return {
      success: true,
      redirectTo: redirectUrl,
    };
  } catch (err) {
    return { error: 'Something went wrong. Please try again.' };
  }
}
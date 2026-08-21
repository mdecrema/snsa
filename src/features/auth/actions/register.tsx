'use server';

import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function register(prevState: any, formData: FormData) {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const rawPassword = formData.get('password') as string;

  if (!email || !rawPassword) {
    return { error: 'Email and password are required.' };
  }

  // 1. Check if user already exists
  console.log('DB Keys:', Object.keys(db));
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: 'Email is already in use.' };
  }

  // 2. Hash the password (10 to 12 salt rounds is optimal)
  const hashedPassword = await bcrypt.hash(rawPassword, 12);

  // 3. Save the new user to PostgreSQL via Prisma
  const newUser = await db.user.create({
    data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: 'ADMIN',
    },
  });

  return { success: true, userId: newUser.id };
}
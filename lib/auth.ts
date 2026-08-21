// src/lib/auth.ts
import { db } from '@/lib/db';
import { Role } from '../app/generated/prisma';
import { cookies } from 'next/headers';

// Example session fetcher — adjust this to match your session strategy (JWT, Iron Session, etc.)
export async function getCurrentUser() {
  const cookieStore = await cookies();
   console.log('cookies', cookieStore)
  const userId = cookieStore.get('session_id')?.value; // or decode JWT token
  console.log('USER_ID', userId)

  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, role: true },
  });

  return user;
}

/**
 * Protects server operations by asserting required role(s).
 */
export async function authorizeRole(allowedRoles: Role[]) {
  const user = await getCurrentUser();
  console.log('USER', user)

  if (!user) {
    return { authorized: false, reason: 'unauthenticated', user: null };
  }

  if (!allowedRoles.includes(user.role)) {
    return { authorized: false, reason: 'unauthorized', user };
  }

  return { authorized: true, reason: null, user };
}
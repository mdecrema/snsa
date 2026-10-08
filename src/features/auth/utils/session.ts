import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function getUserFromSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) return null;

  try {
    const sessionData = JSON.parse(token);
    if (!sessionData?.userId) return null;

    const user = await db.user.findUnique({
      where: { id: sessionData.userId },
      select: { firstName: true, email: true, role: true },
    });

    return user;
  } catch {
    return null;
  }
}
// app/(admin)/users/page.tsx
// DO NOT ADD 'use client' HERE!

import { db } from '@/lib/db';
import UsersManager from '@/src/features/admin/users/components/UsersManager';

export default async function UsersAdminPage() {
  const users = await db.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedUsers = users.map((user) => ({
    ...user,
    createdAt: user.createdAt.toISOString().split('T')[0],
  }));

  return <UsersManager initialUsers={formattedUsers} />;
}
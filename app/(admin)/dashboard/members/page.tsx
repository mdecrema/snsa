import { db } from '@/lib/db';
import MembersManager from '@/src/features/admin/members/components/MembersManager';

export default async function MembersAdmin() {
  const [members, categories] = await Promise.all([
    db.member.findMany({
      include: {
        category: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    db.memberCategory.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
  ]);

  const formattedMembers = members.map((member) => ({
    ...member,
    createdAt: member.createdAt.toISOString().split('T')[0],
  }));

  return <MembersManager initialMembers={formattedMembers} categories={categories} />;
}
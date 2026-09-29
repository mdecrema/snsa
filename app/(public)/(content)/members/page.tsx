import { db } from '@/lib/db'; // Ensure this points to your Prisma Client instance
import { getDictionary } from '@/lib/internalization';
import MembersClientDirectory from '@/src/features/members/components/MembersClientDirectory';

// Ensures fresh database results on page load
export const revalidate = 0; 

export default async function MembersDirectoryPage() {
  const dict = await getDictionary();
  // Fetch categories and published members from PostgreSQL concurrently
  const [categories, members] = await Promise.all([
    db.memberCategory.findMany({
      orderBy: { order: 'asc' },
    }),
    db.member.findMany({
      where: {
        published: true, // Only display active members
      },
      include: {
        category: true, // Performs SQL join to get category details
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
  ]);

  return (
    <MembersClientDirectory
      initialCategories={categories}
      initialMembers={members}
      dict={dict.members}
    />
  );
}
// app/(public)/layout.tsx
import { db } from '@/lib/db';
import Navbar from '@/src/components/layout/Navbar/Navbar';
import PageHeaderBanner from '@/src/components/layout/PageHeaderBanner/page';
// import Footer from '@/src/components/layout/Footer/Footer/';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch active navigation items for the banner
  const navItems = await db.navItem.findMany({
    where: { active: true },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeaderBanner navItems={navItems} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
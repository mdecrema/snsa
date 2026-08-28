import { db } from '@/lib/db';
import PageHeaderBanner from '@/src/components/layout/PageHeaderBanner/page';
import GuestRegisterForm from '@/src/features/membership/components/page';

export default async function Membership() {
  const navItems = await db.navItem.findMany({ orderBy: { order: 'asc' } });

  return (
    <GuestRegisterForm /> 
  );
}
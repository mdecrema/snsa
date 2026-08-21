import { db } from '@/lib/db';
import NavItemsManager from '@/src/features/admin/navigation/components/NavItemsManager';

export default async function AdminPagesManagement() {
  const [navItems, languages] = await Promise.all([
    db.navItem.findMany({ orderBy: { order: 'asc' } }),
    db.language.findMany({ where: { active: true } }),
  ]);

  return <NavItemsManager navItems={navItems} languages={languages} />;
}
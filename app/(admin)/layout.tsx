import { db } from '@/lib/db';
import LanguageSelector from '@/src/components/layout/LanguageSelector/page';
import Link from 'next/link';
import { User } from 'lucide-react';
import AdminNav from '@/src/features/admin/adminNav/components/AdminNav';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TopUtilityBar from '@/src/components/layout/TopUtilityBar/page';
import { getUserFromSession } from '@/src/features/auth/utils/session';
import MobileNavbar from '@/src/components/ui/MobileNavbar/page';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect('/user/login');
  }

  // 2. Chiamate al database eseguite IN PARALLELO
  const [languages, user] = await Promise.all([
    db.language.findMany({ where: { active: true } }),
    getUserFromSession(),
  ]);

  // Se la sessione è scaduta o non valida, reindirizza
  if (!user) {
    redirect('/user/login');
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      {/* 1. NAVBAR MOBILE (Visibile solo su schermi piccoli < 768px) */}
      <MobileNavbar items={[]} languages={languages} user={user} />
      {/* Top Utility Header */}
      <header className="hidden md:block w-full primary_font relative z-50">
        <TopUtilityBar label="Admin Control Panel" languages={languages} user={user} />
        
        {/* Admin Navigation Tabs */}
        <AdminNav />
      </header>

      {/* Dynamic View Content */}
      <main className="flex-1 p-6 relative z-0">
        {children}
      </main>
    </div>
  );
}

import { db } from '@/lib/db';
import LanguageSelector from '@/src/components/layout/LanguageSelector/page';
import Link from 'next/link';
import { User } from 'lucide-react';
import AdminNav from '@/src/features/admin/adminNav/components/AdminNav';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TopUtilityBar from '@/src/components/layout/TopUtilityBar/page';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const languages = await db.language.findMany({ where: { active: true } });
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value; // Match your cookie name

  if (!token) {
    redirect('/user/login');
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      {/* Top Utility Header */}
      <header className="w-full primary_font relative z-50">
        <TopUtilityBar label="Admin Control Panel" />
        
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
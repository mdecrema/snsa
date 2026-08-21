import { db } from '@/lib/db';
import LanguageSelector from '@/src/components/layout/LanguageSelector/page';
import Link from 'next/link';
import { User } from 'lucide-react';
import AdminNav from '@/src/features/admin/adminNav/components/AdminNav';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const languages = await db.language.findMany({ where: { active: true } });

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      {/* Top Utility Header */}
      <header className="w-full primary_font relative z-50">
        <div className="w-full h-[40px] bg-[#F2F2F2] px-8 border-b border-gray-200">
          <div className="max-w-7xl mx-auto h-full flex justify-between items-center text-[#2C3E35]">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Admin Control Panel
            </span>
            <div className="flex items-center gap-6">
              <LanguageSelector languages={languages} />
              <Link 
                href="/user/login" 
                className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity"
              >
                <User size={18} />
                <span>Login</span>
              </Link>
            </div>
          </div>
        </div>

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
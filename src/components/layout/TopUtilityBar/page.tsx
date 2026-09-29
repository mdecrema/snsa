import Link from 'next/link';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import LanguageSelector from '@/src/components/layout/LanguageSelector/page';
import UserMenu from '../../ui/UserMenu/page';

interface TopUtilityBarProps {
  label?: string; // e.g. "Admin Control Panel"
  className?: string;
}

async function getUserFromSession() {
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

export default async function TopUtilityBar({ label, className = '' }: TopUtilityBarProps) {
  const [languages, user] = await Promise.all([
    db.language.findMany({ where: { active: true } }),
    getUserFromSession(),
  ]);

  return (
    <div className={`w-full h-[40px] bg-lightgrey px-8 ${className}`}>
      <div className={`max-w-7xl mx-auto h-full flex items-center ${label ? 'justify-between' : 'justify-end'} text-[#2C3E35]`}>
        {label && (
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            {label}
          </span>
        )}
        <div className="flex items-center gap-6 font-sans">
          <LanguageSelector languages={languages} />
          <UserMenu user={user} />
        </div>
      </div>
    </div>
  );
}
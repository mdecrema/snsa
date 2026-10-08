import Link from 'next/link';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import LanguageSelector from '@/src/components/layout/LanguageSelector/page';
import UserMenu from '../../ui/UserMenu/page';
import { Language } from '@/app/generated/prisma';

interface TopUtilityBarProps {
  label?: string;
  className?: string;
  languages: Language[];
  user?: any;
}

export default async function TopUtilityBar({ label, className = '', languages, user }: TopUtilityBarProps) {

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
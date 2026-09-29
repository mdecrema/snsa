'use client';

import Link from 'next/link';
import { useLanguage } from '@/src/context/LanguageContext';
import { getLocalizedField } from '@/lib/utils';
import type { NavItem } from '@/app/generated/prisma';

interface NavLinksProps {
  items: NavItem[];
}

export default function NavLinks({ items }: NavLinksProps) {
  const { locale } = useLanguage();

  // Filter out 'Home' if you only want it on the logo (as seen in the target design)
  const visibleItems = items.filter((item) => item.href !== '/');

  return (
    <div className="w-full flex justify-between items-center">
      {visibleItems.map((item) => {
        const title = getLocalizedField(item.title, locale, 'en');

        return (
          <Link
            key={item.id}
            href={item.href}
            className="font-serif text-white text-[14px] hover:text-white/80 transition-opacity tracking-wide whitespace-nowrap font-inter"
          >
            {title}
          </Link>
        );
      })}
    </div>
  );
}
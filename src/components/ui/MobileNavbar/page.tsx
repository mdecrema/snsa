'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Language, NavItem } from '@/app/generated/prisma';
import { useLanguage } from '@/src/context/LanguageContext';
import { getLocalizedField } from '@/lib/utils';
import UserMenu from '../UserMenu/page';
import MobileUserMenu from '../MobileUserMenu/page';
import MobileLanguageMenu from '../MobileLanguageMenu/page';

interface MobileNavbarProps {
  items: NavItem[];
  languages: Language[];
  user: any;
}

export default function MobileNavbar({ items, languages, user }: MobileNavbarProps) {
    const { locale } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState('en');

    return (
        <header className="w-full bg-white border-b border-gray-100 block md:hidden relative z-50">
        {/* Barra principale Mobile - Altezza fissa 76px */}
        <div className="w-full h-[76px] px-4 flex justify-between items-center">
            
            {/* Logo a Sinistra */}
            <Link href="/" className="flex items-center gap-2">
            <div className="relative w-[50px] h-[50px]">
                <Image
                src="/images/image_logo_1_edited.png"
                alt="Swiss Natural Skincare Association Logo"
                fill
                className="object-contain"
                priority
                />
            </div>
            <span className="font-serif text-sm font-bold leading-tight text-sixth">
                Swiss Natural <br />
                Skincare Association
            </span>
            </Link>

            {/* Icone a Destra: Hamburger */}
            <div className="flex items-center gap-3">
                {/* Pulsante Hamburger Menu */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-sixth focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>
        </div>

        {/* Menu a scomparsa Mobile (Dropdown) */}
        {isOpen && (
            <div className="absolute top-[76px] left-0 w-full bg-second text-white flex flex-col p-6 shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
                {items.map((item) => {
                    const title = getLocalizedField(item.title, locale, 'en');
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium py-3 border-b border-white/10 last:border-none hover:pl-2 transition-all"
                            >
                            {title}
                        </Link>
                    )
                })}
                <div className={`${items && items.length ? 'mt-20' : ''}`}>
                    <MobileLanguageMenu languages={languages} />
                    <MobileUserMenu user={user} />
                </div>
            </div>
        )}
        </header>
  );
}
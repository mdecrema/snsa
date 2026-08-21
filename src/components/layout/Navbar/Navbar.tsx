import Link from 'next/link';
import Image from 'next/image';
import { User } from 'lucide-react';
import './Navbar.scss';
import { NAV_ITEMS } from '@/src/config/navigation';
import LanguageSelector from '../LanguageSelector/page';
import { db } from '@/lib/db';
import NavLinks from '../../ui/NavbarLink/page';

export default async function Navbar() {
  // const languages = await db.language.findMany({
  //   where: { active: true },
  // });
  const [languages, navItems] = await Promise.all([
    db.language.findMany({
      where: { active: true },
    }),
    db.navItem.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    }),
  ]);

  return (
    <header className="w-full primary_font">
      {/* 1. Top Utility Bar (Login) */}
      <div className="w-full h-[40px] bg-[#F2F2F2] px-8">
        <div className="max-w-7xl mx-auto h-full flex justify-end items-center text-[#2C3E35]">
          {/* Language Selector from Database */}
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

      {/* 2. Logo & Branding Bar */}
      <div className="w-full h-[130px] bg-white px-8">
        <div className="max-w-7xl mx-auto h-full flex justify-start items-center text-[#445238]">
          <Link href="/" className="flex items-center gap-5">
            <div className="relative w-[100px] h-[100px]">
              <Image
                src="/images/image_logo_1_edited.png"
                alt="Swiss Natural Skincare Association Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="font-serif text-2xl font-bold leading-tight">
              Swiss Natural <br />
              Skincare Association
            </div>
          </Link>
        </div>
      </div>

      {/* 3. Main Navigation Bar */}
      <nav className="w-full h-[70px] bg-[#758156] px-8">
        <div className="max-w-7xl mx-auto h-full flex justify-between items-center text-white">
          {/* Dynamic Database Navigation Links */}
          <NavLinks items={navItems} />
        </div>
      </nav>

      {/* 4. Bottom Spacer Bar */}
      <div className="w-full h-[15px] sixth" />
    </header>
  );
}
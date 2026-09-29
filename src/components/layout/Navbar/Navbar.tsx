import Link from 'next/link';
import Image from 'next/image';
import { User } from 'lucide-react';
import './Navbar.scss';
import { NAV_ITEMS } from '@/src/config/navigation';
import LanguageSelector from '../LanguageSelector/page';
import { db } from '@/lib/db';
import NavLinks from '../../ui/NavbarLink/page';
import UserMenu from '../../ui/UserMenu/page';
import { cookies } from 'next/headers';
import TopUtilityBar from '../TopUtilityBar/page';

async function getUserFromSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) return null;

  try {
    const sessionData = JSON.parse(token);
    if (!sessionData?.userId) return null;

    // Fetch user details from DB
    const user = await db.user.findUnique({
      where: { id: sessionData.userId },
      select: { firstName: true, email: true, role: true },
    });

    return user;
  } catch {
    return null;
  }
}

export default async function Navbar() {
  const navItems = await db.navItem.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });

  return (
    <header className="w-full primary_font">
      {/* 1. Top Utility Bar */}
      <TopUtilityBar />

      {/* 2. Logo & Branding Bar */}
      <div className="w-full h-[130px] bg-white px-8">
        <div className="max-w-7xl mx-auto h-full flex justify-start items-center ">
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
      <nav className="w-full h-[70px] bg-second px-8">
        <div className="max-w-7xl mx-auto h-full flex justify-between items-center text-white">
          {/* Dynamic Database Navigation Links */}
          <NavLinks items={navItems} />
        </div>
      </nav>

      {/* 4. Bottom Spacer Bar */}
      <div className="w-full h-[10px] bg-sixth" />
    </header>
  );
}
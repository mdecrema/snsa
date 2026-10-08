'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User as UserIcon, ChevronDown, LogOut, Home, LayoutDashboard, LogIn } from 'lucide-react';
import { logout } from '@/src/features/auth/actions/logout';

interface UserData {
  firstName?: string | null;
  email?: string | null;
  role?: string | null;
}

export default function MobileUserMenu({ user }: { user: UserData | null }) {
  const [isUserOpen, setIsUserOpen] = useState(false);

  if (!user) {
    return (
      <div className="border-b border-white/10 py-3">
        <Link
          href="/user/login"
          className="flex items-center gap-3 text-sm font-medium text-white hover:text-white/80"
        >
          <LogIn size={20} className="text-white/80" />
          <span>Login</span>
        </Link>
      </div>
    );
  }

  const displayName = user.firstName || user.email?.split('@')[0] || 'Utente';

  return (
    <div className="border-b border-white/10 py-3">
      <button
        onClick={() => setIsUserOpen(!isUserOpen)}
        className="flex items-center justify-between w-full text-white font-medium text-sm focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <UserIcon size={20} className="text-white/80" />
          <span>Ciao, <strong className="text-white font-semibold">{displayName}</strong></span>
        </div>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${isUserOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isUserOpen && (
        <div className="pl-8 pt-2 flex flex-col gap-3">
          <Link
            href="/"
            onClick={() => setIsUserOpen(false)}
            className="flex items-center gap-3 text-base text-white/80 hover:text-white py-1 transition-colors"
          >
            <Home size={18} />
            <span>Home</span>
          </Link>

          <Link
            href="/dashboard"
            onClick={() => setIsUserOpen(false)}
            className="flex items-center gap-3 text-base text-white/80 hover:text-white py-1 transition-colors"
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

          <form action={logout} className="pt-1">
            <button
              type="submit"
              className="flex items-center gap-3 text-base text-red-300 hover:text-red-200 py-1 transition-colors w-full text-left"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
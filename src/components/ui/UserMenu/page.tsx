'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User as UserIcon, ChevronDown, LogOut, Home, LayoutDashboard } from 'lucide-react';
import { logout } from '@/src/features/auth/actions/logout';
import { User } from '@/app/generated/prisma';
// import { logoutAction } from '@/src/actions/logoutAction'; // Adjust path to your logout action

interface UserMenuProps {
  user: Pick<User, 'firstName' | 'email' | 'role'> | null;
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // If user is not logged in, render original Login link
  if (!user) {
    return (
      <Link
        href="/user/login"
        className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity"
      >
        <UserIcon size={18} />
        <span>Login</span>
      </Link>
    );
  }

  const displayName = user.firstName || user.email?.split('@')[0] || 'User';

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
      >
        <UserIcon size={18} />
        <span>Ciao, {displayName}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 shadow-lg rounded-md py-1.5 z-50 text-slate-800">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium hover:bg-slate-100 transition-colors"
          >
            <Home size={15} className="text-slate-500" />
            <span>Home</span>
          </Link>

          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium hover:bg-slate-100 transition-colors"
          >
            <LayoutDashboard size={15} className="text-slate-500" />
            <span>Dashboard</span>
          </Link>

          <hr className="my-1 border-slate-100" />

          {/* Logout Action */}
          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}